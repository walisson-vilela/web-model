import { useMemo, useState, useEffect, useCallback } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { MwIcon } from '@mw-kit/mw-ui'

import { useCardHeaderActions } from '../../Card'

import * as S from './styles'

type ViewState = 'summary' | 'details'

const SUMMARY_COLORS = {
  outside: '#E23851',
  inside: '#66BB6A',
}

const DETAIL_COLORS = ['#243B6B', '#3B82F6', '#14B8A6', '#E23851']

const RANGE_QUALITY_DATA = {
  summary: {
    outside: 62,
    inside: 38,
  },
  details: [
    { name: 'KA Nacional', value: 44 },
    { name: 'Regional', value: 22 },
    { name: 'Indireto', value: 18 },
    { name: 'Direto', value: 16 },
  ],
}

const formatPercentage = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)

const RangeQuality = () => {
  const [view, setView] = useState<ViewState>('summary')
  const setHeaderActions = useCardHeaderActions()

  const summarySeries = useMemo(() => {
    const { outside, inside } = RANGE_QUALITY_DATA.summary
    return [
      {
        name: 'Fora',
        y: outside,
        color: SUMMARY_COLORS.outside,
        dataLabels: { enabled: false },
      },
      {
        name: 'Dentro',
        y: inside,
        color: SUMMARY_COLORS.inside,
        dataLabels: { enabled: false },
      },
    ]
  }, [])

  const detailSeries = useMemo(
    () =>
      RANGE_QUALITY_DATA.details.map((item, index) => ({
        name: item.name,
        y: item.value,
        color: DETAIL_COLORS[index % DETAIL_COLORS.length],
      })),
    []
  )

  const chartOptions = useMemo(() => {
    const baseOptions: Highcharts.Options = {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        height: 200,
      },
      title: { text: undefined },
      tooltip: {
        formatter: function () {
          const point = this.point
          const value = typeof point.y === 'number' ? formatPercentage(point.y) : '0,0'
          return `${point.name}<br/>${value}%`
        },
        backgroundColor: '#111827',
        style: { color: '#ffffff' },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          borderWidth: 0,
          size: '80%',
          dataLabels: { enabled: false },
        },
      },
      credits: { enabled: false },
      series: [
        {
          type: 'pie',
          data: view === 'summary' ? summarySeries : detailSeries,
          events:
            view === 'summary'
              ? {
                  click: (event) => {
                    if (event.point.name === 'Fora') {
                      setView('details')
                    }
                  },
                }
              : undefined,
        },
      ],
    }

    return baseOptions
  }, [detailSeries, summarySeries, view])

  const handleBackToSummary = useCallback(() => {
    setView('summary')
  }, [])

  useEffect(() => {
    if (view === 'details') {
      setHeaderActions(
        <S.BackButton
          type='button'
          onClick={handleBackToSummary}
          aria-label='Voltar para visão geral'
        >
          <MwIcon type='feather' icon='corner_up_left' width={16} height={16} />
        </S.BackButton>
      )
    } else {
      setHeaderActions(null)
    }

    return () => setHeaderActions(null)
  }, [handleBackToSummary, setHeaderActions, view])

  return (
    <S.Container>
      <S.SubHeader>
        <span>Tempo de atendimento</span>
      </S.SubHeader>

      <S.ChartWrapper>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </S.ChartWrapper>

      <S.Legend $hidden={view !== 'summary'} aria-hidden={view !== 'summary'}>
        <S.LegendItem>
          <span style={{ backgroundColor: SUMMARY_COLORS.outside }} />
          Fora
        </S.LegendItem>
        <S.LegendItem>
          <span style={{ backgroundColor: SUMMARY_COLORS.inside }} />
          Dentro
        </S.LegendItem>
      </S.Legend>
    </S.Container>
  )
}

export default RangeQuality
