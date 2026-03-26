import { useMemo } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import * as S from './styles'

const JUSTIFICATION_DATA = {
  justified: 35,
  unjustified: 65,
}

const COLORS = {
  justified: '#3B82F6',
  unjustified: '#243B6B',
}

const formatPercentage = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)

const AttendanceJustification = () => {
  const chartOptions = useMemo<Highcharts.Options>(() => ({
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 220,
      spacing: [0, 0, 0, 0],
    },
    title: { text: undefined },
    tooltip: {
      formatter: function () {
        const value = typeof this.y === 'number' ? formatPercentage(this.y) : '0,0'
        return `${this.point.name}<br/>${value}%`
      },
      backgroundColor: '#111827',
      style: { color: '#ffffff' },
    },
    plotOptions: {
      pie: {
        dataLabels: { enabled: false },
        borderWidth: 0,
        size: '70%',
        center: ['50%', '50%'],
      },
    },
    credits: { enabled: false },
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        data: [
          { name: 'Justificado', y: JUSTIFICATION_DATA.justified, color: COLORS.justified },
          { name: 'Não Justificado', y: JUSTIFICATION_DATA.unjustified, color: COLORS.unjustified },
        ],
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
          <span style={{ backgroundColor: COLORS.justified }} />
          Justificado
        </S.LegendItem>
        <S.LegendItem>
          <span style={{ backgroundColor: COLORS.unjustified }} />
          Não Justificado
        </S.LegendItem>
      </S.Legend>
    </S.Container>
  )
}

export default AttendanceJustification
