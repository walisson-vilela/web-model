import { useEffect } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {
  default as HighchartsModules,
  default as HighchartsMore,
} from 'highcharts/highcharts-more'
import treemap from 'highcharts/modules/treemap'
import { get } from 'lodash'
import { AiOutlineExpandAlt } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../../../../store/modules/dashboard/actions'
import logo from '../../assets/img/Icones_Expandir.svg'

import Loading from './Loading'
import { Container } from './styles'

//import {options} from './options'
HighchartsModules(Highcharts)
treemap(Highcharts)
HighchartsMore(Highcharts)

export function Widget28({ setOpen, onHandleOptions, segment_id }) {
  const dispatch = useDispatch()
  const { widget28 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget28

  let dt = new Date() // current date of week
  let currentWeekDay = dt.getDay()
  let lessDays = currentWeekDay == 0 ? 6 : currentWeekDay
  let wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays))
  let wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6))
  const [firstDayWeek] = wkStart.toISOString().split('T')
  const [lastDayWeek] = wkEnd.toISOString().split('T')

  const loadWidget28 = () => {
    dispatch(
      actions.getWidget28({
        start: firstDayWeek,
        end: lastDayWeek,
        segment_id,
      }),
    )
  }

  useEffect(() => {
    loadWidget28()
  }, [segment_id])

  const channel = get(data, 'chart.series[0].data')

  const options = {
    credits: false,
    title: {
      text: '',
    },
    series: [
      {
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        alternateStartingDirection: true,
        levels: [
          {
            level: 1,
            layoutAlgorithm: 'squarified',
            dataLabels: {
              enabled: true,
              align: 'left',
              color: '#fff',
              verticalAlign: 'top',
              style: {
                fontSize: '15px',
                fontWeight: 'normal',
                border: 0,
              },
            },
          },
        ],
        title: {
          text: '',
        },
        data: [],
      },
    ],
  }

  options.series[0].data = channel
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <div className='header'>
            <strong> Top 20 - Rede (S0)</strong>
            <div className='hide-on-print wrapper'>
              <Link to='/main/dashboard/home/top-network'>
                <img src={logo} alt={logo} />
              </Link>

              <AiOutlineExpandAlt
                size={20}
                color='#ddd'
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
          <HighchartsReact
            Highcharts={Highcharts}
            options={options}
            containerProps={{ className: 'widget25' }}
          />
        </Container>
      )}
    </>
  )
}
