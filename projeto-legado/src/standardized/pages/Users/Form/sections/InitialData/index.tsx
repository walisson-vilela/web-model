import { MwGrid } from '@mw-kit/mw-ui'

import * as S from '../../styled'

import * as Inputs from './inputs'

const InitialData = () => {
  return (
    <S.Section>
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
          spacingAround: true,
        }}
        spacing={{
          top: 's3',
          left: '0',
          bottom: 's3',
          right: '0',
        }}
        borderless
      >
        <MwGrid.Row>
          <MwGrid.Col>
            <S.Title $marginBottom='0' children='Dados Iniciais' />
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row>
          <MwGrid.Col width='auto'>
            <Inputs.Role />
          </MwGrid.Col>

          <MwGrid.Col width='auto'>
            <Inputs.Password />
          </MwGrid.Col>
        </MwGrid.Row>
      </MwGrid>
    </S.Section>
  )
}

export default InitialData
