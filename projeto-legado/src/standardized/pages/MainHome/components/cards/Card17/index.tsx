import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import type { CardView } from '../../../cardViewTypes'
import { fetchCard17Data } from '../../../services'
import type { Card17Data, Card17Period } from '../../../types'
import * as S from '../Card16/styles'

const PERIODS: { value: Card17Period; label: string; index: number }[] = [
  { value: 'week', label: 'Semana', index: 0 },
  { value: 'month', label: 'Mês', index: 1 },
  { value: '60-days', label: '60 dias', index: 2 },
]

const periodToIndex = (period: Card17Period): number => {
  const found = PERIODS.find((item) => item.value === period)
  return found ? found.index : 0
}

const indexToPeriod = (index: number): Card17Period => {
  const found = PERIODS.find((item) => item.index === index)
  return found ? found.value : 'week'
}

const buildChartOptions = (
  chartData: Card17Data['chart_data'],
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
      enabled: false,
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        borderWidth: 0,
        pointWidth: 18,
        borderRadius: 8,
      },
    },
    series: [],
  }

  return {
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
}

type Card17ContentProps = {
  initialData: Card17Data
}

const Card17Content = ({ initialData }: Card17ContentProps) => {
  const [period, setPeriod] = useState<Card17Period>('week')
  const [rangeValue, setRangeValue] = useState<number>(periodToIndex('week'))
  const [data, setData] = useState<Card17Data>(initialData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      try {
        const response = await fetchCard17Data(period)
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

export const buildCard17View = (data: Card17Data): CardView => {
  const content: ReactNode = <Card17Content initialData={data} />

  return {
    title: 'Justificativas de Inativação Usuários',
    content,
  }
}
