import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { get } from 'lodash'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Popup } from 'semantic-ui-react'

import { day, weekDay } from '../../helpers/getCurrentDate'

import {
  Container,
  Header,
  Icons,
  Item,
  LeftContent,
  Percentage,
  PopUpContent,
  RightContent,
  Text,
} from './styles'

interface ModalProps {
  title: string
  isOpen: any
  setOpen: any
  options1: any
  options2: any
}

export function ModalWidget({
  title,
  isOpen,
  setOpen,
  options1,
  options2,
}: ModalProps) {
  const { widget13, widget14 } = useSelector((state: any) => state.dashboard)
  const { loading: loading1, data: widgetData13 } = widget13
  const { loading: loading2, data: widgetData14 } = widget14
  let dt = new Date() // current date of week
  let currentWeekDay = dt.getDay()
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

  console.log(widget13)
  const percentage1 = get(widgetData13, 'chart.series[0].data[0]')
  options1.series[0].data[0] = percentage1
  const percentange1 = (options1.series[0].data[0] = get(
    widgetData13,
    'chart.series[0].data[0]',
  ))

  const percentage2 = get(widgetData14, 'chart.series[0].data[0]')
  options1.series[0].data[0] = percentage2 || 0

  if (!isOpen) {
    return <></>
  }

  return (
    <Container>
      <Header>
        <strong>{title}</strong>
        <AiOutlineClose
          size={18}
          onClick={() => {
            setOpen(false)
          }}
        />
      </Header>
      <section>
        <LeftContent>
          <header>
            <strong> Dia Atual</strong>
            <strong className='currentDay'> {weekDay[day]}</strong>
          </header>

          <HighchartsReact
            Highcharts={Highcharts}
            options={options1}
            containerProps={{ className: 'modal-widget14' }}
          />
          <Percentage>{percentage1 || 0}%</Percentage>

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
            <strong> Semana Atual(SO)</strong>
            <div>
              {days.map((item) => (
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
                          <strong className='title'> Metas da execução </strong>
                          <p className='p1'>
                            {' '}
                            Meta percentual:{' '}
                            <strong> {widgetData14.goal}%</strong>
                          </p>
                          <p className='p2'>
                            {' '}
                            Nº Absolutos:{' '}
                            <strong> {widgetData14.performed} </strong> Ated.
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
            containerProps={{ className: 'modal-widget14' }}
          />
          <Percentage>{Math.round(percentage2)}%</Percentage>
          <Icons>
            <Item>
              <strong> {widgetData14.planned || 0}</strong>
              <span> Projetado </span>
            </Item>

            <Item>
              <strong> {Math.round(widgetData14.goal_amount) || 0}</strong>
              <span> Meta</span>
            </Item>

            <Item>
              <strong> {widgetData14.performed || 0} </strong>
              <span> Realizado </span>
            </Item>
          </Icons>
        </RightContent>
      </section>
    </Container>
  )
}
