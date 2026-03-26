import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsModules from 'highcharts/highcharts-more'
import solidGauge from 'highcharts/modules/solid-gauge'

import { day, weekDay } from '../../../../helpers/getCurrentDate'

import { options1, options2 } from './options'
import {
  Container,
  Icons,
  Item,
  LeftContent,
  Percentage,
  RightContent,
  Title,
} from './styles'

HighchartsModules(Highcharts)
solidGauge(Highcharts)

export function ModalWidget14() {
  return (
    <>
      <Title>
        <strong> Performance de Atendimento </strong>
      </Title>
      <Container>
        <LeftContent>
          <header>
            <strong> Dia Atual</strong>
            <strong> {weekDay[day]}</strong>
          </header>

          <HighchartsReact
            Highcharts={Highcharts}
            options={options1}
            containerProps={{ className: 'modalWidget14' }}
          />
          <Percentage> 73%</Percentage>

          <Icons>
            <Item>
              <strong> 384</strong>
              <span> Projetado </span>
            </Item>

            <Item>
              <strong> 345</strong>
              <span> Meta</span>
            </Item>

            <Item>
              <strong> 280 </strong>
              <span> Realizado </span>
            </Item>
          </Icons>
        </LeftContent>
        <RightContent>
          <header>
            <strong> Semana Atual(SO)</strong>
            <div>
              <strong> S </strong>
              <strong> T </strong>
              <strong> Q </strong>
              <strong> S </strong>
              <strong> S </strong>
              <strong> S </strong>
              <strong> D </strong>
            </div>
          </header>
          <HighchartsReact
            Highcharts={Highcharts}
            options={options2}
            containerProps={{ className: 'modalWidget14' }}
          />
          <Percentage>73%</Percentage>
          <Icons>
            <Item>
              <strong> 380</strong>
              <span> Projetado </span>
            </Item>

            <Item>
              <strong> 72</strong>
              <span> Meta</span>
            </Item>

            <Item>
              <strong> 8 </strong>
              <span> Realizado </span>
            </Item>
          </Icons>
        </RightContent>
      </Container>
    </>
  )
}
