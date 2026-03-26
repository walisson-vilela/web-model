import { useMemo } from 'react'

import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official'
import SolidGauge from 'highcharts/modules/solid-gauge'

import * as S from './styles'

HighchartsMore(Highcharts)
SolidGauge(Highcharts)

const SPEED_DATA = {
  average_speed: 42.5,
  unit: 'Km/h',
}

const SpeedAverage = () => {
  const chartOptions = useMemo<Highcharts.Options>(() => {
    return {
      chart: {
        type: 'gauge',
        backgroundColor: 'transparent',
        height: 220,
        spacing: [0, 0, 0, 0],
      },
      title: { text: undefined },
      pane: {
        startAngle: -130,
        endAngle: 130,
        size: '70%',
        center: ['50%', '65%'],
        background: [
          {
            backgroundColor: '#f5f5f5',
            borderWidth: 0,
            outerRadius: '100%',
            innerRadius: '60%',
          },
        ],
      },
      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        minorTickInterval: null,
        tickPixelInterval: 30,
        tickWidth: 2,
        labels: {
          step: 2,
          style: { color: '#4b5563', fontSize: '12px' },
        },
        plotBands: [
          { from: 0, to: 35, color: '#19c172', thickness: 14 },
          { from: 35, to: 65, color: '#FBCF30', thickness: 14 },
          { from: 65, to: 85, color: '#F97316', thickness: 14 },
          { from: 85, to: 100, color: '#E23851', thickness: 14 },
        ],
      },
      tooltip: {
        formatter: function () {
          return `${this.y?.toFixed(1)} ${SPEED_DATA.unit}`
        },
        backgroundColor: '#111827',
        style: { color: '#ffffff' },
      },
      series: [
        {
          type: 'gauge',
          data: [SPEED_DATA.average_speed],
          dataLabels: {
            y: 40,
            borderWidth: 0,
            useHTML: true,
            format: `<div style="text-align:center;color:#111827;font-size:16px;font-weight:600;">{y:.1f}</div>
                    <div style="color:#6b7280;font-size:12px;">${SPEED_DATA.unit}</div>`,
          },
          dial: {
            backgroundColor: '#263046',
            baseWidth: 8,
            baseLength: '0%',
            radius: '70%',
          },
          pivot: {
            backgroundColor: '#263046',
            radius: 6,
          },
        },
      ],
      credits: { enabled: false },
    }
  }, [])

  return (
    <S.Container>
      <S.Subtitle>Deslocamento (Km)</S.Subtitle>
      <S.ChartWrapper>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </S.ChartWrapper>
    </S.Container>
  )
}

export default SpeedAverage
