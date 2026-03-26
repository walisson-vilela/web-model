import { MwGrid } from '@mw-kit/mw-ui'

import * as Inputs from './inputs'
import * as S from './styles'

const BasicData = () => {
  return (
    <MwGrid
      borderless
      spacing={{ left: 's4', top: 's4', right: 's4' }}
      rows={{
        spacing: { left: '0', right: '0' },
        verticalAlign: 'center',
        borderless: true,
      }}
      cols={{ spacing: { top: '0', bottom: '0', left: 's3', right: 's4' } }}
    >
      <MwGrid.Row>
        <MwGrid.Col width='auto'>
          <S.Title>Dados Básicos</S.Title>
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row spacing={{ left: '0', right: '0', bottom: 's3', top: 's3' }}>
        <MwGrid.Col width='auto' spacing='0'>
          Tipo de Produto:
        </MwGrid.Col>

        <Inputs.Type value='OWN' label='Próprio' />

        <Inputs.Type value='COMPETITOR' label='Concorrente' />
      </MwGrid.Row>

      <MwGrid.Row verticalAlign='top'>
        <Inputs.Code />
        <Inputs.Name />
        <Inputs.CategoryAndSublevel />
        <Inputs.Brands />
      </MwGrid.Row>
    </MwGrid>
  )
}

export default BasicData
