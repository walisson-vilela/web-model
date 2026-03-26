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
import { Container, Content, Icons } from './styles'
import './styles.css'

export function Widget33({ setOpen, onHandleOptions, segment_id }) {
  const dispatch = useDispatch()
  const { widget33 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget33

  const loadWidget33 = () => {
    dispatch(actions.getWidget33({}, { segment_id }))
  }

  useEffect(() => {
    loadWidget33()
  }, [segment_id])

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      backgroundColor: null,
    },
    credits: false,
    title: {
      text: '',
    },

    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: 'pointer',
        colors: ['#3CC37B', '#E23851'],
        dataLabels: {
          enabled: false,

          distance: -50,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4,
          },
        },
      },
    },
    series: [
      {
        name: '',
        data: [
          { name: '', y: '' },
          { name: '', y: '' },
        ],
      },
    ],
  }
  const dataX = get(data, 'chart.series[0].data[0].y')
  const dataY = get(data, 'chart.series[0].data[1].y')
  options.series[0].data[0].y = dataX
  options.series[0].data[1].y = dataY
  console.log(dataX, dataY)

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container className='range-quality'>
          <div className='header'>
            <strong> % Range Quality </strong>
            <div className='hide-on-print wrapper'>
              <Link to='/main/dashboard/home/range-quality'>
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
          </div>
          <Content>
            <HighchartsReact
              Highcharts={Highcharts}
              options={options}
              containerProps={{ className: 'widget30' }}
            />
            <Icons className='btns'>
              <div className='wrapper'>
                <div className='item-container'>
                  <div className='bullet'>
                    <div className='bullet-icon' />
                  </div>
                  <span> Dentro </span>
                </div>
                <div className='item-container'>
                  <div className='bullet bullet2'>
                    <div className='bullet-icon' />
                  </div>
                  <span> Fora </span>
                </div>
              </div>
            </Icons>
          </Content>
        </Container>
      )}
    </>
  )
}
