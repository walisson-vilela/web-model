import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import type { CardView } from '../../../cardViewTypes'
import { fetchCard16Data } from '../../../services'
import type { Card16Data, Card16Period } from '../../../types'

import * as S from './styles'

const PERIODS: { value: Card16Period; label: string; index: number }[] = [
  { value: 'today', label: 'Hoje', index: 0 },
  { value: 'd-1', label: 'D-1', index: 1 },
  { value: 'week', label: 'Semana', index: 2 },
  { value: 'month', label: 'Mês', index: 3 },
  { value: '60-days', label: '60 dias', index: 4 },
]

const periodToIndex = (period: Card16Period): number => {
  const found = PERIODS.find((item) => item.value === period)
  return found ? found.index : 0
}

const indexToPeriod = (index: number): Card16Period => {
  const found = PERIODS.find((item) => item.index === index)
  return found ? found.value : 'today'
}

const buildChartOptions = (
  chartData: Card16Data['chart_data'],
): Highcharts.Options => {
  const defaults: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      height: 120,
    },
    title: { text: undefined },
    credits: { enabled: false },
    xAxis: {
      categories: [''],
      lineWidth: 0,
      tickWidth: 0,
      labels: { enabled: false },
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 20,
      title: { text: undefined },
      lineWidth: 1,
      lineColor: '#e5e7eb',
      gridLineWidth: 0,
      labels: {
        style: { color: '#6b7280', fontSize: '11px' },
      },
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        borderWidth: 0,
        pointWidth: 18,
        borderRadius: 0,
      },
    },
    series: [],
  }

  const merged: Highcharts.Options = {
    ...defaults,
    ...chartData,
    chart: { ...defaults.chart, ...chartData?.chart },
    xAxis: {
      ...defaults.xAxis,
      ...(chartData?.xAxis as Highcharts.XAxisOptions | undefined),
    },
    yAxis: {
      ...defaults.yAxis,
      ...(chartData?.yAxis as Highcharts.YAxisOptions | undefined),
    },
    legend: { ...defaults.legend, ...chartData?.legend },
    credits: { ...defaults.credits, ...chartData?.credits },
    tooltip: { ...defaults.tooltip, ...chartData?.tooltip },
    plotOptions: {
      ...defaults.plotOptions,
      ...chartData?.plotOptions,
      series: {
        ...defaults.plotOptions?.series,
        ...chartData?.plotOptions?.series,
      },
    },
    series: chartData?.series ?? defaults.series,
  }

  const rawSeries =
    (merged.series as Highcharts.SeriesOptionsType[] | undefined) || []

  const scoreSeries = (series: Highcharts.SeriesOptionsType) => {
    const name = (series as Highcharts.SeriesOptionsType & { name?: string })
      .name
    if (name === 'Não Justificado') return 0
    if (name === 'Justificado') return 1
    return 2
  }

  if (rawSeries.length > 0) {
    const ordered = [...rawSeries].sort(
      (a, b) => scoreSeries(a) - scoreSeries(b),
    )

    ordered.forEach((series) => {
      const s = series as Highcharts.SeriesBarOptions
      if (s.name === 'Justificado') {
        s.legendIndex = 0
      } else if (s.name === 'Não Justificado') {
        s.legendIndex = 1
      }
    })

    merged.series = ordered
  }

  return merged
}

type Card16ContentProps = {
  initialData: Card16Data
}

const Card16Content = ({ initialData }: Card16ContentProps) => {
  const [period, setPeriod] = useState<Card16Period>('today')
  const [rangeValue, setRangeValue] = useState<number>(periodToIndex('today'))
  const [data, setData] = useState<Card16Data>(initialData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      try {
        const response = await fetchCard16Data(period)
        if (!cancelled) {
          setData(response)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [period])

  const chartOptions = useMemo(
    () => buildChartOptions(data.chart_data),
    [data.chart_data],
  )

  return (
    <S.Body>
      <S.PeriodSection>
        <S.PeriodLabel>Período</S.PeriodLabel>

        <S.RangeWrapper>
          <MwInput
            type='range'
            value={rangeValue}
            setValue={(value) => {
              const nextValue =
                typeof value === 'function' ? value(rangeValue) : value
              const numeric = Number(nextValue)
              setRangeValue(numeric)
              setPeriod(indexToPeriod(numeric))
            }}
            markers={{
              markers: PERIODS.map((item) => ({
                label: item.label,
                value: item.index,
              })),
              strict: true,
              position: 'bottom',
              min: 0,
              max: PERIODS.length - 1,
            }}
            step='1'
            width='100%'
            hideNavbar
            disabled={loading}
          />
        </S.RangeWrapper>
      </S.PeriodSection>

      <S.ChartWrapper>
        <S.ChartContainer>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { width: '100%', height: '100%' } }}
          />
        </S.ChartContainer>
      </S.ChartWrapper>

      <S.DetailsHeader>
        Detalhamento por ocorrências ({data.total})
      </S.DetailsHeader>

      <S.DetailsListWrapper>
        <S.DetailsList>
          {data.details.map((detail) => (
            <li key={detail.label}>
              <span>{detail.label}</span>
              <S.DetailCount>{detail.count}</S.DetailCount>
            </li>
          ))}
        </S.DetailsList>
      </S.DetailsListWrapper>
    </S.Body>
  )
}

export const buildCard16View = (data: Card16Data): CardView => {
  const content: ReactNode = <Card16Content initialData={data} />

  return {
    title: 'Justificativa de Não Atendimento',
    content,
  }
}
