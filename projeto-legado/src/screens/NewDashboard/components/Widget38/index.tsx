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
import { currentDate } from '../../helpers/getCurrentDate'

import Loading from './components/Loading'
import { Container } from './styles'
import './styles.css'

HighchartsModules(Highcharts)
pareto(Highcharts)
HighchartsMore(Highcharts)

export function Widget38({ setOpen, onHandleOptions, segment_id }) {
  const dispatch = useDispatch()
  const { widget38 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget38

  const loadWidget38 = () => {
    dispatch(actions.getWidget38({ date: currentDate, segment_id }))
  }

  useEffect(() => {
    loadWidget38()
  }, [segment_id])

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
          text: 'Distância Média',
          style: {
            color: Highcharts.getOptions().colors[1],
            fontWeight: 'bold',
          },
        },
      },
      {
        // Secondary yAxis
        title: {
          text: 'Média Móvel',
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
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {},
    series: [
      {
        name: 'Distância Média',
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

  let categories = get(data, 'chart.xAxis[0].categories')

  const avg = get(data, 'chart.series[1].data')
  const performance = get(data, 'chart.series[0]data')
  options.xAxis[0].categories = categories

  options.series[0].data = avg
  options.series[1].data = performance

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container className='speed-movel'>
          <header>
            <strong> Distância Média vs Média Móvel 21 dias </strong>
            <AiOutlineExpandAlt
              className='hide-on-print'
              size={20}
              color='#ddd'
              onClick={() => {
                setOpen(true)
                onHandleOptions(options)
              }}
            />
          </header>
          <div>
            <HighchartsReact
              Highcharts={Highcharts}
              options={options}
              containerProps={{ className: 'widget31' }}
            />
          </div>
        </Container>
      )}
    </>
  )
}
