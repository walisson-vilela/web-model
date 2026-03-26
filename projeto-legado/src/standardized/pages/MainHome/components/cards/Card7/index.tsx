import { ReactNode } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import type { CardView } from '../../../cardViewTypes'
import type { Card7Data } from '../../../types'
import * as S from './styles'


const formatPercentage = (value: number) =>
  `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value)}%`

const buildChartOptions = (
  chartData: Card7Data['chart_data'],
  goal: number,
): Highcharts.Options => {
  const defaultOptions: Highcharts.Options = {
    chart: {
      type: 'spline',
      backgroundColor: 'transparent',
      height: 140,
      margin: [0, 0, 0, 0],
    },
    title: { text: undefined },
    xAxis: {
      visible: false,
    },
    yAxis: {
      gridLineWidth: 0,
      title: { text: undefined },
      labels: { enabled: false },
      lineWidth: 0,
      plotLines: [
        {
          value: goal,
          color: '#9CA3AF',
          dashStyle: 'Dot',
          width: 1,
          zIndex: 5,
        },
      ],
    },
    legend: { enabled: false },
    tooltip: { enabled: false },
    credits: { enabled: false },
    plotOptions: {
      series: {
        marker: { enabled: false },
        lineWidth: 3,
      },
    },
  }

  const merged = {
    ...defaultOptions,
    ...chartData,
    chart: { ...defaultOptions.chart, ...chartData?.chart },
    xAxis: { ...defaultOptions.xAxis, ...chartData?.xAxis },
    legend: { ...defaultOptions.legend, ...chartData?.legend },
    tooltip: { ...defaultOptions.tooltip, ...chartData?.tooltip },
    credits: { ...defaultOptions.credits, ...chartData?.credits },
    plotOptions: {
      ...defaultOptions.plotOptions,
      ...chartData?.plotOptions,
      series: {
        ...defaultOptions.plotOptions?.series,
        ...chartData?.plotOptions?.series,
      },
    },
  } as Highcharts.Options

  const mergedYAxis = {
    ...defaultOptions.yAxis,
    ...(chartData?.yAxis as Highcharts.YAxisOptions | undefined),
  } as Highcharts.YAxisOptions

  mergedYAxis.plotLines = [
    ...(chartData?.yAxis?.plotLines ?? []),
    ...(defaultOptions.yAxis?.plotLines ?? []),
  ]

  merged.yAxis = mergedYAxis

  return merged
}

export const buildCard7View = (data: Card7Data): CardView => {
  const chartOptions = buildChartOptions(data.chart_data, data.goal)
  const referenceSeries = chartOptions.series?.[0]
  const pointsCount = Array.isArray(referenceSeries?.data)
    ? referenceSeries?.data.length
    : 0

  if (pointsCount > 0) {
    const goalSeries: Highcharts.SeriesLineOptions = {
      type: 'line',
      data: Array(pointsCount).fill(data.goal),
      color: '#9CA3AF',
      dashStyle: 'ShortDash',
      enableMouseTracking: false,
      marker: { enabled: false },
      lineWidth: 1.5,
      zIndex: 4,
    }

    chartOptions.series = [...(chartOptions.series ?? []), goalSeries]
  }

  const content: ReactNode = (
    <S.Body>
      <S.ChartWrapper>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </S.ChartWrapper>

      <S.Columns>
        <S.Column>
          <S.ColumnTitle>Abaixo do programado</S.ColumnTitle>
          <S.ColumnValue $color='#19C172'>
            {formatPercentage(data.below_scheduled_percentage)}
          </S.ColumnValue>
          <S.ColumnDetail>
            {data.below_scheduled}/{data.scheduled}
          </S.ColumnDetail>
        </S.Column>

        <S.Divider />

        <S.Column>
          <S.ColumnTitle>Acima do programado</S.ColumnTitle>
          <S.ColumnValue $color='#E23851'>
            {formatPercentage(data.above_scheduled_percentage)}
          </S.ColumnValue>
          <S.ColumnDetail>
            {data.above_scheduled}/{data.scheduled}
          </S.ColumnDetail>
        </S.Column>
      </S.Columns>
    </S.Body>
  )

  return {
    title: `Tempo de Atendimento | Meta: ${formatPercentage(data.goal)}`,
    content,
  }
}
