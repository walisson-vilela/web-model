import { useEffect } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { get } from 'lodash'
import { AiOutlineExpandAlt } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../../../../store/modules/dashboard/actions'
import logo from '../../assets/img/Icones_Expandir.svg'

import Loading from './components/Loading'
import { Container } from './styles'
import './styles.css'

export function Widget35({ setOpen, onHandleOptions, segment_id }) {
  const dispatch = useDispatch()
  const { widget35 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget35

  const loadWidget35 = () => {
    dispatch(actions.getWidget35({ segment_id }))
  }

  useEffect(() => {
    loadWidget35()
  }, [segment_id])

  const options = {
    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: null,
    },
    credits: {
      enabled: false,
    },

    title: {
      text: '',
    },

    pane: {
      startAngle: -150,
      endAngle: 150,
      background: [
        {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#FFF'],
              [1, '#333'],
            ],
          },
          borderWidth: 0,
          outerRadius: '109%',
        },
        {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#333'],
              [1, '#FFF'],
            ],
          },
          borderWidth: 1,
          outerRadius: '107%',
        },
        {
          // default background
        },
        {
          backgroundColor: '#DDD',
          borderWidth: 0,
          outerRadius: '105%',
          innerRadius: '103%',
        },
      ],
    },

    // the value axis
    yAxis: {
      min: 0,
      max: 200,

      minorTickInterval: 'auto',
      minorTickWidth: 1,
      minorTickLength: 10,
      minorTickPosition: 'inside',
      minorTickColor: '#666',

      tickPixelInterval: 30,
      tickWidth: 2,
      tickPosition: 'inside',
      tickLength: 10,
      tickColor: '#666',
      labels: {
        step: 2,
        rotation: 'auto',
      },
      title: {
        text: 'km/h',
      },
      plotBands: [
        {
          from: 0,
          to: 120,
          color: '#55BF3B', // green
        },
        {
          from: 120,
          to: 160,
          color: '#DDDF0D', // yellow
        },
        {
          from: 160,
          to: 200,
          color: '#DF5353', // red
        },
      ],
    },

    series: [
      {
        name: 'Velocidade',
        data: [],
        tooltip: {
          valueSuffix: ' km/h',
        },
      },
    ],
  }

  const avarage = get(data, 'chart.series[0].data[0]')
  options.series[0].data[0] = avarage

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container className='speed'>
          <header>
            <strong>
              Velocidade Média
              <br />
              <span> Deslocamento </span>
            </strong>
            <div className='hide-on-print wrapper'>
              <Link to='/main/dashboard/home/average-speed'>
                <img src={logo} alt='logo' />
              </Link>

              <AiOutlineExpandAlt
                size={20}
                color='#ddd'
                className='svg'
                onClick={() => {
                  setOpen(true)
                  onHandleOptions(options)
                }}
              />
            </div>
          </header>
          <HighchartsReact
            Highcharts={Highcharts}
            options={options}
            containerProps={{ className: 'widget30' }}
          />
        </Container>
      )}
    </>
  )
}
