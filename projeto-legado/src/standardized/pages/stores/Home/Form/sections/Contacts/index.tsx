import { MwGrid } from '@mw-kit/mw-ui'

import * as S from '../../styled'

import ContactRecipientComponent from './components/ContactRecipient'
import * as Inputs from './inputs'

const Contacts = () => {
  return (
    <MwGrid
      rows={{
        borderless: true,
      }}
      cols={{
        spacing: {
          top: 's1',
          left: 's3',
          bottom: 's3',
          right: 's3',
        },
        align: { content: { horizontal: 'left' } },
        spacingAround: true,
      }}
      spacing={{
        top: 's4',
        left: '0',
        bottom: 's4',
        right: '0',
      }}
      borderless
    >
      <MwGrid.Row>
        <MwGrid.Col
          width='auto'
          spacing={{ top: '0', right: 's1', left: 's3' }}
        >
          <S.Title>Contatos</S.Title>
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col width='2'>
          <Inputs.Phone name='phone' label='PDV' />
        </MwGrid.Col>

        <MwGrid.Col width='4'>
          <Inputs.Email name='email' label='E-mail' />
        </MwGrid.Col>
      </MwGrid.Row>

      <ContactRecipientComponent name='manager_contact' />

      <ContactRecipientComponent name='person_in_charge_1_contact' />

      <ContactRecipientComponent name='person_in_charge_2_contact' />
    </MwGrid>
  )
}

export default Contacts
