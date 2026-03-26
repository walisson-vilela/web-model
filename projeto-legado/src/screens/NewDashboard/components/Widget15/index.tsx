import React, { useEffect } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { get } from 'lodash'
import { AiOutlineExpandAlt } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Popup } from 'semantic-ui-react'

import * as actions from '../../../../store/modules/dashboard/actions/index'

import Loading from './Loading'
import { options } from './options'
import { Container, Icons } from './styles'

interface WidgetProps {
  setOpen: any
  onHandleOptions: any
  segment_id: any
}

export function Widget15({
  segment_id,
  setOpen,
  onHandleOptions,
}: WidgetProps) {
  const dispatch = useDispatch()
  const { widget15 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget15

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

  let dt = new Date() // current date of week
  let currentWeekDay = dt.getDay()
  let lessDays = currentWeekDay == 0 ? 6 : currentWeekDay
  let wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays))
  let wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6))
  const [firstDayWeek] = wkStart.toISOString().split('T')
  const [lastDayWeek] = wkEnd.toISOString().split('T')

  const s1 = get(data, 'chart.series.data[0].data[0]')
  const s0 = get(data, 'chart.series.data[1].data[0]')
  options.series[0].data[0] = s1
  options.series[1].data[0] = s0

  const obj1 = {
    name: 'S1',
    start,
    end,
  }

  const obj2 = {
    name: 'S0',
    start: firstDayWeek,
    end: lastDayWeek,
  }

  const loadWidget15 = () => {
    const data = [obj1, obj2]
    const params = { segment_id }

    dispatch(actions.getWidget15(data, params))
  }

  useEffect(() => {
    loadWidget15()
  }, [segment_id])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <header>
              <Popup
                inverted
                wide
                className='popup-field'
                position='bottom center'
                content={'Performance Projetado'}
                trigger={
                  <h1 style={{ cursor: 'pointer' }}> Performance Projetado</h1>
                }
              />

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

            <HighchartsReact
              Highcharts={Highcharts}
              options={options}
              containerProps={{ className: 'widget15' }}
            />
            <Icons>
              <span> S-1 </span>
              <span> S0</span>
            </Icons>
          </Container>
        </>
      )}
    </>
  )
}
