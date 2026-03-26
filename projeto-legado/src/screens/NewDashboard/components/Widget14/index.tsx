import { useCallback, useEffect } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsModules from 'highcharts/highcharts-more'
import solidGauge from 'highcharts/modules/solid-gauge'
import { get } from 'lodash'
import { AiOutlineExpandAlt } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'

import * as actions from '../../../../store/modules/dashboard/actions'
import logo from '../../assets/img/Icones_Expandir.svg'
import { day, weekDay } from '../../helpers/getCurrentDate'

import { Loading } from './components/Loading'
import { options1, options2 } from './options'
import {
  Container,
  Icons,
  Item,
  LeftContent,
  Percentage,
  PopUpContent,
  RightContent,
  Text,
  Title,
  WidgetContainer,
} from './styles'

HighchartsModules(Highcharts)
solidGauge(Highcharts)

interface WidgetProps {
  setOpen: any
  onSetOptions1: any
  onSetOption2: any
  filters: any
  segment_id: any
}

export function Widget14({
  setOpen,
  onSetOptions1,
  onSetOptions2,
  filters,
  segment_id,
}) {
  console.log('SegmentId Widget14', segment_id)

  const dispatch = useDispatch()
  const { widget13, widget14 } = useSelector((state: any) => state.dashboard)
  const { loading: loading1, data: widgetData13 } = widget13
  const { loading: loading2, data: widgetData14 } = widget14

  let dt = new Date() // current date of week
  let currentWeekDay = dt.getDay()
  let lessDays = currentWeekDay == 0 ? 6 : currentWeekDay
  let wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays))
  let wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6))
  const [firstDayWeek] = wkStart.toISOString().split('T')
  const [lastDayWeek] = wkEnd.toISOString().split('T')

  const days = [
    {
      id: 1,
      day: weekDay[1],
    },
    {
      id: 2,
      day: weekDay[2],
    },

    {
      id: 3,
      day: weekDay[3],
    },

    {
      id: 4,
      day: weekDay[4],
    },

    {
      id: 5,
      day: weekDay[5],
    },

    {
      id: 6,
      day: weekDay[6],
    },
    {
      id: 7,
      day: weekDay[0],
    },
  ]

  const loadData = useCallback(async () => {
    let params = {}
    dispatch(actions.getWidget13({ segment_id }))
    dispatch(
      actions.getWidget14({
        start: firstDayWeek,
        end: lastDayWeek,
        segment_id,
      }),
    )
    //options1.series[0].data[0] =
  }, [segment_id])

  const pointer1 = get(widgetData13, 'goal')
  const pointer2 = get(widgetData14, 'goal')

  options1.yAxis.tickPositions[0] = pointer1
  options2.yAxis.tickPositions[0] = pointer1

  let percentage1 = get(widgetData13, 'chart.series[0].data[0]')
  options1.series[0].data[0] = percentage1

  const percentage2 = get(widgetData14, 'chart.series[0].data[0]')
  options2.series[0].data[0] = percentage2

  onSetOptions1(options1)
  onSetOptions2(options2)

  useEffect(() => {
    loadData()
  }, [segment_id])

  return (
    <>
      {loading1 && loading2 ? (
        <Loading />
      ) : (
        <WidgetContainer>
          <Title>
            <strong> Performance de Atendimento </strong>
            <div className='hide-on-print'>
              <Link to='/main/dashboard/home/service-performance'>
                <img src={logo} alt='logo' />
              </Link>

              <AiOutlineExpandAlt
                size={20}
                color='#ddd'
                onClick={() => setOpen(true)}
                className='svg'
              />
            </div>
          </Title>

          <Container>
            <LeftContent>
              <header>
                <strong> Dia Atual</strong>
                <strong className='currentDay'> {weekDay[day]}</strong>
              </header>

              <HighchartsReact
                Highcharts={Highcharts}
                options={options1}
                containerProps={{ className: 'widget14' }}
              />
              <Percentage> {percentage1 || 0}%</Percentage>

              <Icons>
                <Item>
                  <strong> {widgetData13.planned || 0}</strong>
                  <span> Projetado </span>
                </Item>

                <Item>
                  <strong> {widgetData13.goal_amount || 0}</strong>
                  <span> Meta</span>
                </Item>

                <Item>
                  <strong> {widgetData13.performed || 0} </strong>
                  <span> Realizado </span>
                </Item>
              </Icons>
            </LeftContent>
            <RightContent>
              <header>
                <strong> Semana Atual (S0)</strong>
                <div>
                  {days.map((item, index) => (
                    <Popup
                      key={item.id}
                      style={{
                        width: 193,
                        height: 93,
                        paddingTop: 14,
                        paddingBottom: 14,
                        paddingLeft: 14,
                        paddingRight: 14,
                      }}
                      trigger={
                        <Text currentDay={item.id === currentWeekDay}>
                          {' '}
                          {item.day}{' '}
                        </Text>
                      }
                      position='bottom center'
                      content={() => {
                        return (
                          <PopUpContent>
                            <div className='content'>
                              <strong className='title'>
                                {' '}
                                Metas da execução{' '}
                              </strong>
                              <p className='p1'>
                                {' '}
                                Meta percentual: <strong> {pointer2} %</strong>
                              </p>
                              <p className='p2'>
                                {' '}
                                Nº Absolutos:{' '}
                                <strong> {widgetData14.performed} </strong>{' '}
                                Ated.
                              </p>
                            </div>
                          </PopUpContent>
                        )
                      }}
                    />
                  ))}
                </div>
              </header>
              <HighchartsReact
                Highcharts={Highcharts}
                options={options2}
                containerProps={{ className: 'widget14' }}
              />
              <Percentage>{percentage2 || 0}%</Percentage>
              <Icons>
                <Item>
                  <strong> {widgetData14.planned || 0}</strong>
                  <span> Projetado </span>
                </Item>

                <Item>
                  <strong> {widgetData14.goal_amount || 0}</strong>
                  <span> Meta</span>
                </Item>

                <Item>
                  <strong> {widgetData14.performed || 0} </strong>
                  <span> Realizado </span>
                </Item>
              </Icons>
            </RightContent>
          </Container>
        </WidgetContainer>
      )}
    </>
  )
}
