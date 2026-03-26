import { MwGrid } from '@mw-kit/mw-ui'

import * as S from '../../styled'

import * as Inputs from './inputs'

const BasicData = () => {
  return (
    <MwGrid
      borderless
      spacing={{ left: 's4', top: 's4', right: 's4', bottom: 's4' }}
      rows={{
        spacing: { left: '0', right: '0' },
        verticalAlign: 'center',
        borderless: true,
      }}
      cols={{ spacing: { top: '0', bottom: '0', left: 's3', right: 's4' } }}
    >
      <MwGrid.Row>
        {' '}
        <S.Title>Dados Básicos</S.Title>
      </MwGrid.Row>
      <MwGrid.Row>
        <Inputs.Name />

        <Inputs.Birthdate />

        <Inputs.Document />

        <Inputs.Registration />
      </MwGrid.Row>

      <MwGrid.Row>
        <Inputs.Admission />

        <Inputs.Pis />

        <Inputs.Sector />
      </MwGrid.Row>
    </MwGrid>
  )
}

export default BasicData
