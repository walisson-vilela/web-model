import { ReactNode } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'

import type { CardView } from '../../../cardViewTypes'
import type { Card8Data } from '../../../types'
import * as S from './styles'

if (typeof Highcharts === 'object') {
  HighchartsMore(Highcharts)
}

const mergeGaugeOptions = (
  chartData: Card8Data['chart_data'],
): Highcharts.Options => {
  const defaults: Highcharts.Options = {
    chart: {
      type: 'gauge',
      backgroundColor: 'transparent',
      spacing: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
    },
    title: undefined,
    tooltip: { enabled: false },
    pane: {
      center: ['50%', '55%'],
      size: '95%',
      startAngle: -140,
      endAngle: 140,
      background: {
        innerRadius: '70%',
        outerRadius: '100%',
        shape: 'arc',
        borderWidth: 0,
        backgroundColor: '#f5f6f7',
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 10,
      lineWidth: 0,
      labels: {
        distance: -15,
        style: { color: '#374151', fontSize: '11px' },
      },
      plotBands: [
        { from: 0, to: 50, color: '#30c48d', thickness: 12 },
        { from: 50, to: 70, color: '#f2cb40', thickness: 12 },
        { from: 70, to: 85, color: '#f28e2b', thickness: 12 },
        { from: 85, to: 100, color: '#e23851', thickness: 12 },
      ],
    },
    plotOptions: {
      gauge: {
        dataLabels: {
          enabled: true,
          useHTML: true,
          format:
            '<div style="text-align:center"><span style="font-size:18px">{y}</span><br/><span style="font-size:12px;color:#6b7280">Km/h</span></div>',
        },
        dial: {
          radius: '80%',
          backgroundColor: '#6b7280',
          baseWidth: 6,
          rearLength: '0%',
        },
        pivot: {
          radius: 6,
          backgroundColor: '#6b7280',
        },
      },
    },
    credits: { enabled: false },
  }

  return {
    ...defaults,
    ...chartData,
    chart: { ...defaults.chart, ...chartData?.chart },
    pane: { ...defaults.pane, ...chartData?.pane },
    yAxis: {
      ...defaults.yAxis,
      ...(chartData?.yAxis as Highcharts.YAxisOptions | undefined),
    },
    tooltip: { ...defaults.tooltip, ...chartData?.tooltip },
    plotOptions: {
      ...defaults.plotOptions,
      ...chartData?.plotOptions,
      gauge: {
        ...defaults.plotOptions?.gauge,
        ...chartData?.plotOptions?.gauge,
        dataLabels: {
          ...defaults.plotOptions?.gauge?.dataLabels,
          ...chartData?.plotOptions?.gauge?.dataLabels,
        },
        dial: {
          ...defaults.plotOptions?.gauge?.dial,
          ...chartData?.plotOptions?.gauge?.dial,
        },
        pivot: {
          ...defaults.plotOptions?.gauge?.pivot,
          ...chartData?.plotOptions?.gauge?.pivot,
        },
      },
    },
    series: chartData?.series ?? defaults.series,
    credits: { ...defaults.credits, ...chartData?.credits },
  }
}

export const buildCard8View = (data: Card8Data): CardView => {
  const chartOptions = mergeGaugeOptions(data.chart_data)

  const content: ReactNode = (
    <S.Body>
      <S.Description>Deslocamento (Km)</S.Description>
      <S.GaugeWrapper>
        <S.GaugeContainer>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { width: '100%', height: '100%' } }}
          />
        </S.GaugeContainer>
      </S.GaugeWrapper>
    </S.Body>
  )

  return {
    title: 'Velocidade Média',
    content,
  }
}
