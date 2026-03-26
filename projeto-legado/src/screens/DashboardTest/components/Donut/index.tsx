import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Grid, Header, Popup } from 'semantic-ui-react'

import { weekDay } from '../../../NewDashboard/helpers/getCurrentDate'

import { DonutWrapper, PopUpContent, Text, Title } from './styles'

interface DonutProps {
  text?: string
  isDay?: boolean
  options: any
  data?: any
  className?: string
}
const currentDay = () => {
  const date = new Date()
  return date.getDay()
}

const WeekDay = ({ data }) => {
  const currentWeekDay = currentDay()
  let days = [
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

  return (
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
            <Text currentDay={item.id === currentWeekDay}> {item.day} </Text>
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
                    <strong> {data.chart.series[0].data[0] || 0}%</strong>
                  </p>
                  <p className='p2'>
                    {' '}
                    Nº Absolutos: <strong> {data.performed || 0} </strong> Ated.
                  </p>
                </div>
              </PopUpContent>
            )
          }}
        />
      ))}
    </div>
  )
}

const Footer = ({ data }) => {
  return (
    <Grid divided>
      <Grid.Row columns='equal'>
        <Grid.Column textAlign='right'>
          <Header size='tiny' textAlign='right' style={{ color: '#000' }}>
            {data.planned || 0}
          </Header>
          Projetado
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <Header size='tiny' textAlign='center' style={{ color: '#000' }}>
            {data.goal_amount || 0}
          </Header>
          Meta
        </Grid.Column>
        <Grid.Column textAlign='left'>
          <Header size='tiny' textAlign='left' style={{ color: '#000' }}>
            {data.performed || 0}
          </Header>
          Realizado
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export const Donut = ({ text, isDay, options, data }: DonutProps) => {
  const day = currentDay()

  return (
    <DonutWrapper>
      <DonutWrapper.Description className='wrapper'>
        <Header
          textAlign='center'
          size='small'
          content={text}
          className='text'
        />

        {isDay}
        <DonutWrapper.Header size='small' textAlign='center' className='text'>
          {isDay ? <Title>{weekDay[day]}</Title> : <WeekDay data={data} />}
        </DonutWrapper.Header>
        <HighchartsReact
          Highcharts={Highcharts}
          options={options}
          containerProps={{ className: 'widget14' }}
        />
      </DonutWrapper.Description>
      <DonutWrapper.Description>
        <Footer data={data} />
      </DonutWrapper.Description>
    </DonutWrapper>
  )
}
