import { useEffect } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { get } from 'lodash'
import { AiOutlineExpandAlt } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../../../../store/modules/dashboard/actions'
import { getStartAndEndDayOfWeek } from '../../../../utils/DateTime'
import logo from '../../assets/img/Icones_Expandir.svg'

import Loading1 from './Loading1'
import Loading2 from './Loading2'
import { options } from './options'
import { Container, Raio, TMO } from './styles'

interface WidgetProps {
  setOpen: any
  onHandleOptions: any
  segment_id: any
}
export function Widget17({
  segment_id,
  setOpen,
  onHandleOptions,
}: WidgetProps) {
  const dispatch = useDispatch()
  const { widget17, widget18 } = useSelector((state: any) => state.dashboard)
  const { loading: loading1, data: data1 } = widget17
  const { loading, data } = widget18
  const [start, end] = getStartAndEndDayOfWeek()

  const loadWidget17 = () => {
    dispatch(actions.getWidget17({ segment_id }))
  }

  const loadWidget18 = () => {
    dispatch(actions.getWidget18({ start, end }))
  }

  const seriesData = get(data, 'series') || []
  options.series = seriesData

  useEffect(() => {
    loadWidget17()
  }, [segment_id])

  useEffect(() => {
    loadWidget18()
  }, [segment_id])
  return (
    <Container>
      {loading1 ? (
        <Loading1 />
      ) : (
        <TMO>
          <h1> TMO - Dia Atual </h1>

          <strong> {data1.tmo}%</strong>
        </TMO>
      )}
      {loading ? (
        <Loading2 />
      ) : (
        <Raio>
          <div>
            <strong> Raio X TMO S0</strong>
            <div className='item hide-on-print wrapper'>
              <Link to='/main/dashboard/home/xray-tmo'>
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
          <HighchartsReact
            Highcharts={Highcharts}
            options={options}
            containerProps={{ className: 'widget18' }}
          />
        </Raio>
      )}
    </Container>
  )
}
