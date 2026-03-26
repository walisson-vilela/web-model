import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {
  default as HighchartsModules,
  default as HighchartsMore,
} from 'highcharts/highcharts-more'
import pareto from 'highcharts/modules/pareto'
import treemap from 'highcharts/modules/treemap'

import { Buttons, Container, Title } from './styles'

//import {options} from './options'
HighchartsModules(Highcharts)
pareto(Highcharts)
treemap(Highcharts)
HighchartsMore(Highcharts)

interface DefaultModalProps {
  title: string
  subTitle?: string
  modalOptions: object
  hasButton?: boolean
}

export function DefaultModal({
  title,
  modalOptions,
  subTitle,
  hasButton,
}: DefaultModalProps) {
  return (
    <Container>
      <Title>
        <strong> {title}</strong>
        <br />
        <span>{subTitle}</span>
      </Title>

      {hasButton ? (
        <div className='wrapper'>
          <HighchartsReact
            Highcharts={Highcharts}
            options={modalOptions}
            containerProps={{ className: 'customButton' }}
          />
          <Buttons>
            <button> S0 </button>
            <button> S-1 </button>
            <button> S-2 </button>
            <button> S-3 </button>
          </Buttons>
        </div>
      ) : (
        <HighchartsReact
          Highcharts={Highcharts}
          options={modalOptions}
          containerProps={{ className: 'defaultModal' }}
        />
      )}
    </Container>
  )
}
