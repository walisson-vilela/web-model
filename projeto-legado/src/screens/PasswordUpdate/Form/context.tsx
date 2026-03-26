import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Resolver, useForm } from 'react-hook-form'

import Modal, { ModalState } from '../../../components/MwModal'

import { Context, Form as FormInterface, PasswordRule } from './interfaces'
import getSchema from './schema'

const FormContext = createContext({} as Context)

const useFormContext = () => useContext(FormContext)

const defaultValues: FormInterface = {
  password: '',
  password_confirm: '',
}

export const FormProvider = (props: PropsWithChildren) => {
  const [passwordRules, setPasswordRules] = useState<PasswordRule[]>([])
  const [passwordFrequency, setPasswordFrequency] = useState<number>(0)
  const [modal, setModal] = useState<ModalState | null>(null)

  const resolver = yupResolver(getSchema()) as Resolver<FormInterface>
  const form = useForm<FormInterface>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
    criteriaMode: 'all',
  })
  const {
    formState: { errors, touchedFields },
  } = form

  const setValue: typeof form.setValue = (name, value, config) => {
    form.setValue(name, value as never, {
      shouldDirty: true,
      shouldValidate: true,
      ...(config || {}),
    })
  }

  const isInvalid: Context['form']['isInvalid'] = useCallback(
    (name) => {
      if (!(name in errors)) return false
      if (errors[name].type !== 'required') return true
      return name in touchedFields
    },
    [errors, touchedFields],
  )

  return (
    <FormContext.Provider
      value={{
        form: {
          ...form,
          setValue,
          isInvalid,
        },
        passwordRules: [passwordRules, setPasswordRules],
        passwordFrequency: [passwordFrequency, setPasswordFrequency],
        setModal,
      }}
    >
      <React.Fragment {...props} />

      {modal && <Modal modal={modal} />}
    </FormContext.Provider>
  )
}

export default useFormContext
