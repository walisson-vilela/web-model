import React from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import * as S from '../../styled'

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
          bottom: '0',
          right: 's3',
        },
        align: { content: { vertical: 'top' } },
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
        <MwGrid.Col width='2' style={{ maxWidth: '200px' }}>
          <Inputs.Document />
        </MwGrid.Col>

        <MwGrid.Col>
          <Inputs.Name />
        </MwGrid.Col>

        <MwGrid.Col width='2'>
          <Inputs.OccupationArea />
        </MwGrid.Col>

        <MwGrid.Col width='auto'>
          <Inputs.SharedModel />
        </MwGrid.Col>

        <MwGrid.Col width='2'>
          <Inputs.Subdomain />
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default BasicData
