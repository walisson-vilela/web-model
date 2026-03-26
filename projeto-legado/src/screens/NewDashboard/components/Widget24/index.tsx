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

export function Widget24({ setOpen, onHandleOptions, segment_id }) {
  const dispatch = useDispatch()
  const { widget24 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget24

  const tmo = get(data, 'chart.series[0].data')
  const performance = get(data, 'chart.series[1].data')

  const options = {
    colors: ['#2D9AFF', '#66BB6A'],
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
  let dt = new Date() // current date of week
  let currentWeekDay = dt.getDay()
  let lessDays = currentWeekDay == 0 ? 6 : currentWeekDay
  let wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays))
  let wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6))
  const [firstDayWeek] = wkStart.toISOString().split('T')
  const [lastDayWeek] = wkEnd.toISOString().split('T')

  options.series[0].data = tmo
  options.series[1].data = performance

  const loadWidget24 = () => {
    dispatch(
      actions.getWidget24({
        start: firstDayWeek,
        end: lastDayWeek,
        segment_id,
      }),
    )
  }

  useEffect(() => {
    loadWidget24()
  }, [segment_id])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <div>
            <strong> TMO vs Performance</strong>
            <AiOutlineExpandAlt
              className='hide-on-print'
              onClick={() => {
                onHandleOptions(options)
                setOpen(true)
              }}
              size={20}
              color='#ddd'
            />
          </div>
          <span>S0</span>
          <HighchartsReact
            Highcharts={Highcharts}
            options={options}
            containerProps={{ className: 'widget22' }}
          />
        </Container>
      )}
    </>
  )
}
