import React from 'react'

import { Card } from '../../../../interfaces'

import * as S from './styles'

interface CardProps {
  data: Card
}

export const GraphicArea = ({ data }: CardProps): JSX.Element => {
  const fields = [
    {
      item: 'A',
      value: 60,
      color: '#7a93ac',
    },
    {
      item: 'S0',
      value: 100,
      color: '#8E66BB',
    },

    {
      item: 'S1',
      value: 70,
      color: '#2D9AFF',
    },
  ]
  return (
    <React.Fragment>
      <S.GraphicAreaContainer>
        <S.Content>
          <div className='wrapper'>
            <ul>
              {fields.map((item, index) => (
                <li key={index}> {item.item}</li>
              ))}
            </ul>

            <S.Graphic>
              {fields.map((item, index) => (
                <S.ProgressBar color={item.color} percentage={item.value} />
              ))}
            </S.Graphic>
          </div>
          <S.StatusWrapper>
            <div className='divider'></div>
            <S.Range>
              <span> 0 </span>
              <span> 20 </span>
              <span> 40 </span>
              <span> 60 </span>
              <span> 80 </span>
              <span> 100</span>
            </S.Range>
          </S.StatusWrapper>
        </S.Content>
        <S.GraphicStatic>
          <h3> {data.chart.percentage.value || 0}% </h3>
          <span>{data.chart.percentage.label}</span>
        </S.GraphicStatic>
      </S.GraphicAreaContainer>
    </React.Fragment>
  )
}
