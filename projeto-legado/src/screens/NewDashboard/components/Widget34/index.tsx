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

export function Widget34({ segment_id, setOpen, onHandleOptions }) {
  const dispatch = useDispatch()
  const [isPress1, setIsPress1] = useState(false)
  const [isPress2, setIsPress2] = useState(false)
  const [isPress3, setIsPress3] = useState(false)
  const [isPress4, setIsPress4] = useState(false)
  const { widget34 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget34

  console.log('Widget34 ', data)

  const s0 = getStartEndDayOfWeek()
  const s1 = getStartEndDayOfWeek(1)
  const s2 = getStartEndDayOfWeek(2)
  const s3 = getStartEndDayOfWeek(3)

  const loadWidget34 = () => {
    const data = [s0]
    const params = { segment_id }
    dispatch(actions.getWidget34(data, params))
  }

  const categoriesData = get(data, 'chart.xAxis.categories')
  const seriesData = get(data, 'chart.series')

  console.log('Widget34 CategoriesData', categoriesData)
  useEffect(() => {
    setIsPress1(true)
    loadWidget34()
  }, [segment_id])

  const options = {
    chart: {
      type: 'boxplot',
      backgroundColor: null,
    },

    title: {
      text: '',
    },

    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },

    xAxis: {
      categories: [],
      title: {
        text: '',
      },
    },

    yAxis: {
      title: {
        text: '',
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
        <Container className='distribution-attendences'>
          <header>
            <strong> Tempo de Atendimento (Distribuição)</strong>
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
          <div className='wrapper'>
            <HighchartsReact
              Highcharts={Highcharts}
              options={options}
              containerProps={{ className: 'widget31' }}
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
                  dispatch(actions.getWidget34([s0]))
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

                  dispatch(actions.getWidget34([s1]))
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
                  dispatch(actions.getWidget34([s2]))
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
                  dispatch(actions.getWidget34([s3]))
                  onHandleOptions(options)
                }}
              >
                {' '}
                S-3{' '}
              </button>
            </Buttons>
          </div>
        </Container>
      )}
    </>
  )
}
