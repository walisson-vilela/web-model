import type { ReactNode } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import type { CardView } from '../../../cardViewTypes'
import type { Card13Data } from '../../../types'

import * as S from './styles'

const buildChartOptions = (
  chartData: Card13Data['chart_data'],
): Highcharts.Options => {
  const defaults: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
    },
    title: { text: undefined },
    credits: { enabled: false },
    xAxis: {
      categories: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      crosshair: true,
    },
    yAxis: [
      {
        title: { text: 'TMO' },
        min: 0,
        max: 200,
      },
      {
        title: { text: 'Performance' },
        min: 0,
        max: 200,
        opposite: true,
      },
    ],
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      column: {
        borderRadius: 4,
      },
      series: {
        marker: {
          enabled: true,
          radius: 4,
        },
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
    yAxis:
      (chartData?.yAxis as Highcharts.YAxisOptions[] | undefined) ??
      defaults.yAxis,
    legend: { ...defaults.legend, ...chartData?.legend },
    credits: { ...defaults.credits, ...chartData?.credits },
    tooltip: { ...defaults.tooltip, ...chartData?.tooltip },
    plotOptions: {
      ...defaults.plotOptions,
      ...chartData?.plotOptions,
      column: {
        ...defaults.plotOptions?.column,
        ...chartData?.plotOptions?.column,
      },
      series: {
        ...defaults.plotOptions?.series,
        ...chartData?.plotOptions?.series,
      },
    },
    series: chartData?.series ?? defaults.series,
  }

  return merged
}

export const buildCard13View = (data: Card13Data): CardView => {
  const chartOptions = buildChartOptions(data.chart_data)

  const content: ReactNode = (
    <S.Body>
      <S.Subtitle>S0</S.Subtitle>
      <S.ChartWrapper>
        <S.ChartContainer>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { width: '100%', height: '100%' } }}
          />
        </S.ChartContainer>
      </S.ChartWrapper>
    </S.Body>
  )

  return {
    title: 'TMO X Performance',
    content,
  }
}
