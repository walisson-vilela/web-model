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

interface WidgetProps {
  segment_id: any
}

export function Widget23({ setOpen, onHandleOptions, segment_id }) {
  const dispatch = useDispatch()
  const { widget23 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget23

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
        categories: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        crosshair: true,
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
          text: 'TMO',
          style: {
            color: Highcharts.getOptions().colors[1],
            fontWeight: 'bold',
          },
        },
        softMax: 200,
        max: 200,
      },
      {
        // Secondary yAxis
        title: {
          text: 'Performance',
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
        softMax: 200,
        max: 200,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {},
    series: [
      {
        name: 'TMO',
        type: 'column',
        yAxis: 1,
        data: [],
      },
      {
        name: 'Performance',
        type: 'spline',
        data: [],
      },
    ],
  }

  let previousMonday = new Date()
  previousMonday.setDate(
    previousMonday.getDate() - ((previousMonday.getDay() + 7) % 14),
  )
  let previousSaturday = new Date()
  previousSaturday.setDate(
    previousSaturday.getDate() - ((previousSaturday.getDay() + 1) % 14),
  )
  const [start] = previousMonday.toISOString().split('T')
  const [end] = previousSaturday.toISOString().split('T')

  const loadWidget23 = () => {
    dispatch(actions.getWidget23({ start, end, segment_id }))
  }

  useEffect(() => {
    loadWidget23()
  }, [segment_id])

  const tmo = get(data, 'chart.series[0].data')
  const performance = get(data, 'chart.series[1].data')
  console.log(tmo, performance)
  options.series[0].data = tmo
  options.series[1].data = performance
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <div>
              <strong> TMO vs Performance</strong>
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
            <span>S-1</span>
            <HighchartsReact
              Highcharts={Highcharts}
              options={options}
              containerProps={{ className: 'widget21' }}
            />
          </Container>
        </>
      )}
    </>
  )
}
