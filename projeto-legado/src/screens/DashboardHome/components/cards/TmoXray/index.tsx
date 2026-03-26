import { useMemo } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import * as S from './styles'

const DATA = {
  plus: 78,
  minus: 6,
}

const COLORS = {
  plus: '#19C172',
  minus: '#E23851',
}

const TmoXray = () => {
  const chartOptions = useMemo<Highcharts.Options>(() => ({
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      height: 130,
      spacing: [7, 7, 0, 7],
    },
    title: { text: undefined },
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
      title: undefined,
      gridLineColor: '#e5e7eb',
      labels: { style: { color: '#6b7280', fontSize: '12px' } },
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      itemStyle: { color: '#263046', fontSize: '13px' },
    },
    tooltip: {
      backgroundColor: '#111827',
      style: { color: '#ffffff' },
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
    },
    plotOptions: {
      series: {
        borderRadius: 4,
        pointPadding: 0.2,
      },
    },
    credits: { enabled: false },
    series: [
      { type: 'bar', name: 'TMO+', data: [DATA.plus], color: COLORS.plus },
      { type: 'bar', name: 'TMO-', data: [DATA.minus], color: COLORS.minus },
    ],
  }), [])

  return (
    <S.Container>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </S.Container>
  )
}

export default TmoXray
