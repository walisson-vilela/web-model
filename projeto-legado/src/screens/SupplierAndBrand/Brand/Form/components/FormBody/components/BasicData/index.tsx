import { MwGrid } from '@mw-kit/mw-ui'

import * as S from '../../../../styled'

import * as Inputs from './inputs'

const ComplementData = () => {
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
        <MwGrid.Col>
          <S.Title>Dados Básicos</S.Title>
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row verticalAlign='center'>
        <MwGrid.Col width='auto'>
          <span>Tipo da Marca:</span>
        </MwGrid.Col>

        <MwGrid.Col width='auto'>
          <Inputs.Type label='Própria' value='OWN' />
        </MwGrid.Col>

        <MwGrid.Col width='auto'>
          <Inputs.Type label='Concorrente' value='COMPETITOR' />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col width='2'>
          <Inputs.SupplierSelect />
        </MwGrid.Col>

        <MwGrid.Col width='2'>
          <Inputs.Code />
        </MwGrid.Col>

        <MwGrid.Col width='4'>
          <Inputs.Name />
        </MwGrid.Col>

        <MwGrid.Col width='2'>
          <Inputs.CountryOperation />
        </MwGrid.Col>

        <MwGrid.Col width='2'>
          <Inputs.Classification />
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default ComplementData
