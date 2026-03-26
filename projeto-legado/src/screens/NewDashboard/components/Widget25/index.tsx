import React, { useEffect } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {
  default as HighchartsModules,
  default as HighchartsMore,
} from 'highcharts/highcharts-more'
import pareto from 'highcharts/modules/pareto'
import { get } from 'lodash'
import { AiOutlineExpandAlt } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../../../../store/modules/dashboard/actions'

import Loading from './components/Loading'
import { Container } from './styles'

//import {options} from './options'
HighchartsModules(Highcharts)
pareto(Highcharts)
HighchartsMore(Highcharts)

interface WidgetsProps {
  segment_id: any
  onHandleOptions: any
  setOpen: any
}

export function Widget25({
  segment_id,
  setOpen,
  onHandleOptions,
}: WidgetsProps) {
  const dispatch = useDispatch()
  const { widget25 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget25

  const options = {
    colors: ['#1E63A3', '#66BB6A'],
    credits: false,
    chart: {
      zoomType: 'xy',
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    xAxis: [
      {
        categories: [],
        crosshair: false,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        title: {
          text: 'Performance',
          style: {
            color: Highcharts.getOptions().colors[1],
            fontWeight: 'bold',
          },
        },
        softMax: 100,
        max: 100,
      },
      {
        // Secondary yAxis
        title: {
          text: '',
          style: {
            color: Highcharts.getOptions().colors[1],
            fontWeight: 'bold',
          },
        },
        labels: {
          format: '{value}',
          style: {
            color: '#1a1a1d',
          },
        },
        opposite: true,
        softMax: 100,
        max: 100,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {},
    series: [
      {
        name: 'Performance',
        type: 'column',
        yAxis: 1,
        data: [],
      },
      {
        name: 'Média Móvel',
        type: 'spline',
        data: [],
      },
    ],
  }

  const loadWidget25 = () => {
    dispatch(actions.getWidget25({ segment_id }))
  }

  let newArray = []
  let categories = get(data, 'chart.xAxis[0].categories')

  const avg = get(data, 'chart.series[1].data')
  const performance = get(data, 'chart.series[0]data')
  options.xAxis[0].categories = categories

  options.series[0].data = avg
  options.series[1].data = performance
  useEffect(() => {
    loadWidget25()
  }, [segment_id])
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <div>
            <strong> Performance de Atendimento vs Média Móvel 21 dias</strong>
            <AiOutlineExpandAlt
              className='hide-on-print'
              size={20}
              color='#ddd'
              onClick={() => {
                setOpen(true)
                onHandleOptions(options)
              }}
            />
          </div>
          <HighchartsReact
            Highcharts={Highcharts}
            options={options}
            containerProps={{ className: 'widget23' }}
          />
        </Container>
      )}
    </>
  )
}
