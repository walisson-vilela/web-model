import { MwGrid } from '@mw-kit/mw-ui'

import * as S from '../../styled'

import * as Inputs from './inputs'

const Contact = () => {
  return (
    <MwGrid
      borderless
      spacing={{ left: 's4', top: 's4', right: 's4', bottom: 's4' }}
      rows={{
        spacing: { left: '0', right: '0', top: '0', bottom: 's3' },
        verticalAlign: 'center',
        horizontalAlign: 'left',
        borderless: true,
      }}
      cols={{
        spacing: { left: '0', right: 's5', top: '0', bottom: '0' },
        width: 'auto',
      }}
    >
      <MwGrid.Row>
        <S.Title>Contato</S.Title>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col>
          <Inputs.Phone name='phone' />
        </MwGrid.Col>

        <MwGrid.Col>
          <Inputs.Phone name='phone_2' />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col width='4'>
          <Inputs.Email />
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Contact
