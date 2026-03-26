import React from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { useHookFormsAsState } from '../../../../../../../../utils/hooks'
import useFormContext from '../../../../context'
import { Form } from '../../../../interfaces'

type Config = {
  label: string
  checked: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const defaultValue: Form['replace'] = {
  user: null,
  items: [],
}

const getConfig = (
  value: 0 | 1,
  replace: Form['replace'],
  setReplace: React.Dispatch<React.SetStateAction<Form['replace']>>,
): Config => {
  return value === 1
    ? {
        label: 'Sim',
        checked: replace !== null,
        onChange: (e) => {
          setReplace(e.target.checked ? defaultValue : null)
        },
      }
    : {
        label: 'Não',
        checked: replace === null,
        onChange: (e) => {
          setReplace(e.target.checked ? null : defaultValue)
        },
      }
}

const Radio = (props: { value: 0 | 1 }) => {
  const { value } = props

  const { form } = useFormContext()

  const [replace, setReplace] = useHookFormsAsState('replace', form)

  return <MwInput type='radio' {...getConfig(value, replace, setReplace)} />
}

export default Radio
