import { useMemo } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import * as S from './styles'

const CATEGORIES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

const DATA = {
  tmo: [20, 100, 140, 110, 40, 180, 90],
  performance: [10, 95, 100, 65, 35, 15, 5],
}

const TmoPerformance = () => {
  const chartOptions = useMemo<Highcharts.Options>(() => ({
    chart: {
      backgroundColor: 'transparent',
      height: 230,
      spacing: [21, 7, 0, 7],
    },
    title: { text: undefined },
    xAxis: {
      categories: CATEGORIES,
      lineColor: '#e5e7eb',
      tickColor: '#e5e7eb',
      labels: { style: { color: '#4b5563', fontSize: '12px' } },
    },
    yAxis: [
      {
        title: { text: 'TMO', style: { color: '#3B82F6' } },
        gridLineColor: '#e5e7eb',
        labels: { style: { color: '#4b5563', fontSize: '12px' } },
      },
      {
        title: { text: 'Performance', style: { color: '#19C172' } },
        labels: { style: { color: '#4b5563', fontSize: '12px' } },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
      backgroundColor: '#111827',
      style: { color: '#ffffff' },
    },
    legend: { enabled: false },
    credits: { enabled: false },
    series: [
      {
        type: 'column',
        name: 'TMO',
        data: DATA.tmo,
        color: '#3B82F6',
        yAxis: 0,
      },
      {
        type: 'line',
        name: 'Performance',
        data: DATA.performance,
        color: '#19C172',
        yAxis: 1,
        marker: {
          enabled: true,
          radius: 4,
          lineColor: '#19C172',
          lineWidth: 2,
          fillColor: '#ffffff',
        },
      },
    ],
  }), [])

  return (
    <S.Container>
      <S.ChartWrapper>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </S.ChartWrapper>

      <S.Legend>
        <S.LegendItem>
          <span style={{ backgroundColor: '#3B82F6' }} />
          TMO
        </S.LegendItem>
        <S.LegendItem>
          <span style={{ backgroundColor: '#19C172' }} />
          Performance
        </S.LegendItem>
      </S.Legend>
    </S.Container>
  )
}

export default TmoPerformance
