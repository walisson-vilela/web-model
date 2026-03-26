import React from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import { BodyInterface } from '../../../../interface'

import * as S from './styles'

interface IContent {
  id: number
  electronic_point_label: string
  weekdays: BodyInterface['weekdays']
}

const Content = (props: IContent) => {
  const { id, electronic_point_label: eletronic_point_label, weekdays } = props

  return (
    <S.PopupContainer>
      <S.PopupHeader>Rotina Semanal</S.PopupHeader>
      <S.SubHeader>
        Id:{id} | Turno: {eletronic_point_label}
      </S.SubHeader>

      <MwGrid
        style={{ height: '207px', alignContent: 'baseline' }}
        spacing={{ left: 's4' }}
        borderless
      >
        <S.Row header spacing={{ right: '0', left: '0', bottom: '0' }}>
          <MwGrid.Col
            width='auto'
            children={<React.Fragment>Inicio</React.Fragment>}
          />
          <MwGrid.Col
            width='2'
            children={<React.Fragment>Término</React.Fragment>}
          />
          <MwGrid.Col
            width='auto'
            children={<React.Fragment>Dia da Semana</React.Fragment>}
          />
        </S.Row>
        <S.ScrollArea>
          {weekdays
            .sort((a, b) => {
              const order = [7, 1, 2, 3, 4, 5, 6]
              return order.indexOf(a.weekday) - order.indexOf(b.weekday)
            })
            .map((day, index) => {
              return (
                <S.Row key={index}>
                  <MwGrid.Col width='auto'>{day.starts_at}</MwGrid.Col>
                  <MwGrid.Col
                    width='2'
                    align={{ content: { horizontal: 'center' } }}
                  >
                    {day.ends_at}
                  </MwGrid.Col>
                  <MwGrid.Col width='auto'>{day.weekday_label}</MwGrid.Col>
                </S.Row>
              )
            })}
        </S.ScrollArea>
      </MwGrid>
    </S.PopupContainer>
  )
}

export default Content
