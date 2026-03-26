import React from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import * as S from '../../styles'

import * as Inputs from './inputs'

const BasicData = () => {
  return (
    <MwGrid
      rows={{
        borderless: true,
      }}
      cols={{
        spacing: {
          top: 's1',
          left: 's3',
          bottom: 's1',
          right: 's3',
        },
      }}
      spacing={{
        top: 's4',
        left: 's3',
        bottom: 's4',
        right: 's3',
      }}
      borderless
    >
      <MwGrid.Row>
        <MwGrid.Col spacing='0'>
          <S.Title children='Dados Básicos' />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col width='4'>
          <Inputs.Name />
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default BasicData
