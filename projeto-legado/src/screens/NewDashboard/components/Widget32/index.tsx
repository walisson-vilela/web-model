import React, { useEffect, useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { get } from 'lodash'
import { AiOutlineExpandAlt } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../../../../store/modules/dashboard/actions'
import { getStartEndDayOfWeek } from '../../../../utils/DateTime'

import Loading from './components/Loading'
import { Buttons, Container } from './styles'
import './styles.css'

export function Widget32({ setOpen, onHandleOptions, segment_id }) {
  const dispatch = useDispatch()
  const [isPress1, setIsPress1] = useState(false)
  const [isPress2, setIsPress2] = useState(false)
  const [isPress3, setIsPress3] = useState(false)
  const [isPress4, setIsPress4] = useState(false)
  const { widget32 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget32

  const s0 = getStartEndDayOfWeek()
  const s1 = getStartEndDayOfWeek(1)
  const s2 = getStartEndDayOfWeek(2)
  const s3 = getStartEndDayOfWeek(3)

  const loadWidget32 = () => {
    const data = [s0]
    const params = { segment_id }
    dispatch(actions.getWidget32(data, params))
  }

  useEffect(() => {
    setIsPress1(true)
    loadWidget32()
  }, [segment_id])
  /*

    chart: {
        type: 'spline'
    },
    title: {
        text: null
    },
    subtitle: {
        text: null
    },
    xAxis: {

        categories: [15, 65, 115, 165, 215, 265]
    },
    yAxis: {
        title: {
            text: null
        },

    },
    tooltip: {
        crosshairs: true,
        shared: true
    },
    plotOptions: {
        spline:{
            marker:{
                enabled: false
            }
        }
     },
    series: [{
        name: 'Tokyo',
        marker: {
            symbol: 'circle'
        },
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5]

    }, {
        name: 'London',
        marker: {
            symbol: 'ball'
        },
        data: [ 4.2, 5.7, 8.5, 11.9, 15.2, 17.0]

    */

  const categoriesData = get(data, 'chart.xAxis.categories')
  const seriesData = get(data, 'chart.series')
  const options = {
    credits: false,
    chart: {
      type: 'spline',
      backgroundColor: null,
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [],
  }
  options.xAxis.categories = categoriesData
  options.series = seriesData

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container className='time-attendences'>
          <header>
            <strong> Tempo de Atendimento (Desvio Padrão 2.0) </strong>
            <AiOutlineExpandAlt
              className='hide-on-print svg'
              size={20}
              color='#ddd'
              onClick={() => {
                setOpen(true)
                onHandleOptions(options)
              }}
            />
          </header>
          <section>
            <HighchartsReact
              Highcharts={Highcharts}
              options={options}
              containerProps={{ className: 'widget29' }}
            />
            <Buttons
              btn1={isPress1}
              btn2={isPress2}
              btn3={isPress3}
              btn4={isPress4}
            >
              <button
                className='btn1'
                onClick={async () => {
                  setIsPress1(true)
                  setIsPress2(false)
                  setIsPress3(false)
                  setIsPress4(false)
                  dispatch(actions.getWidget32([s0]))
                  onHandleOptions(options)
                }}
              >
                {' '}
                S0{' '}
              </button>
              <button
                className='btn2'
                onClick={async () => {
                  setIsPress2(true)
                  setIsPress1(false)
                  setIsPress3(false)
                  setIsPress4(false)
                  onHandleOptions(options)

                  dispatch(actions.getWidget32([s1]))
                }}
              >
                {' '}
                S-1{' '}
              </button>
              <button
                className='btn3'
                onClick={async () => {
                  setIsPress3(true)
                  setIsPress2(false)
                  setIsPress1(false)
                  setIsPress4(false)
                  onHandleOptions(options)
                  dispatch(actions.getWidget32([s2]))
                }}
              >
                {' '}
                S-2{' '}
              </button>
              <button
                className='btn4'
                onClick={async () => {
                  setIsPress4(true)
                  setIsPress2(false)
                  setIsPress1(false)
                  setIsPress3(false)
                  dispatch(actions.getWidget32([s3]))
                  onHandleOptions(options)
                }}
              >
                {' '}
                S-3{' '}
              </button>
            </Buttons>
          </section>
        </Container>
      )}
    </>
  )
}
