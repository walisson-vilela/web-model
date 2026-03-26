import { useCallback } from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import { useHookFormsAsState } from '../../../../../../../../../utils/hooks'
import useFormContext from '../../../../context'
import { ContactRecipient, Form } from '../../../../interfaces'
import * as Inputs from '../../inputs'

const useContactRecipientState = (
  name: keyof ContactRecipient,
  value: ContactRecipient,
  setValue: React.Dispatch<React.SetStateAction<ContactRecipient>>,
) => {
  const set: React.Dispatch<React.SetStateAction<string>> = (s) => {
    setValue((prev) => {
      const v = typeof s === 'function' ? s(prev[name]) : s
      return s === prev[name] ? prev : { ...prev, [name]: v }
    })
  }

  return [value[name], set] as const
}

const emptyErrors = {}

type Props = {
  name: keyof Pick<
    Form,
    | 'manager_contact'
    | 'person_in_charge_1_contact'
    | 'person_in_charge_2_contact'
  >
}

const nameLabels: { [K in Props['name']]: string } = {
  manager_contact: 'Nome do Gerente',
  person_in_charge_1_contact: 'Nome do Encarregado 1',
  person_in_charge_2_contact: 'Nome do Encarregado 2',
}

const ContactRecipientComponent = (props: Props) => {
  const { form, setValueOptions } = useFormContext()

  const errors = form.formState.errors[props.name] || emptyErrors

  const [value, setValue] = useHookFormsAsState(props.name, {
    ...form,
    setValueOptions,
  })

  const isInvalid = useCallback(
    (name: keyof ContactRecipient) => {
      return (
        form.formState.submitCount > 0 &&
        (('type' in errors && errors.type === 'atLeastOne') || name in errors)
      )
    },
    [errors, form.formState.submitCount],
  )

  const [name, setName] = useContactRecipientState('name', value, setValue)
  const [email, setEmail] = useContactRecipientState('email', value, setValue)
  const [phone1, setPhone1] = useContactRecipientState(
    'phone_1',
    value,
    setValue,
  )
  const [phone2, setPhone2] = useContactRecipientState(
    'phone_2',
    value,
    setValue,
  )

  return (
    <MwGrid.Row>
      <MwGrid.Col width='4'>
        <Inputs.Name
          value={[name, setName]}
          invalid={isInvalid('name')}
          label={nameLabels[props.name]}
        />
      </MwGrid.Col>

      <MwGrid.Col width='2'>
        <Inputs.Phone
          value={[phone1, setPhone1]}
          invalid={isInvalid('phone_1')}
          label='Telefone 1'
        />
      </MwGrid.Col>

      <MwGrid.Col width='2'>
        <Inputs.Phone
          value={[phone2, setPhone2]}
          invalid={isInvalid('phone_2')}
          label='Telefone 2'
        />
      </MwGrid.Col>

      <MwGrid.Col width='4'>
        <Inputs.Email
          value={[email, setEmail]}
          invalid={isInvalid('email')}
          label='Email'
        />
      </MwGrid.Col>
    </MwGrid.Row>
  )
}

export default ContactRecipientComponent
