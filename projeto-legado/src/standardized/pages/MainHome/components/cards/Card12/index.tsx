import type { ReactNode } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import type { CardView } from '../../../cardViewTypes'
import type { Card12Data } from '../../../types'

import * as S from './styles'

const buildBarOptions = (
  chartData: Card12Data['chart_data'],
): Highcharts.Options => {
  const defaults: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      height: 120,
    },
    title: undefined,
    legend: { enabled: false },
    credits: { enabled: false },
    xAxis: {
      categories: ['TMO+', 'TMO-'],
      lineWidth: 0,
      tickWidth: 0,
      gridLineWidth: 0,
      labels: {
        style: { color: '#4b5563', fontSize: '12px' },
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 20,
      title: { text: undefined },
      lineWidth: 1,
      lineColor: '#e5e7eb',
      tickWidth: 1,
      tickLength: 4,
      tickColor: '#e5e7eb',
      gridLineWidth: 0,
      labels: {
        style: { color: '#6b7280', fontSize: '11px' },
      },
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        pointPadding: 0.1,
        groupPadding: 0.25,
        pointWidth: 18,
        borderRadius: 8,
      },
    },
    tooltip: { enabled: false },
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

  const baseSeries =
    (merged.series as Highcharts.SeriesBarOptions[] | undefined) ??
    (defaults.series as Highcharts.SeriesBarOptions[])

  merged.series = baseSeries.map((series) => {
    const next: Highcharts.SeriesBarOptions = {
      type: 'bar',
      ...series,
    }

    if (Array.isArray(next.data)) {
      next.data = next.data.map((point, index) => {
        const baseColor = index === 0 ? '#19c172' : '#e23851'

        if (typeof point === 'number') {
          return {
            y: point,
            color: baseColor,
          }
        }

        if (
          typeof point === 'object' &&
          point !== null &&
          !('color' in point)
        ) {
          return {
            ...point,
            color: baseColor,
          }
        }

        return point
      })
    }

    return next
  })

  return merged
}

export const buildCard12View = (data: Card12Data): CardView => {
  const chartOptions = buildBarOptions(data.chart_data)

  const content: ReactNode = (
    <S.Body>
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
    title: 'TMO Raio X S0',
    content,
  }
}
