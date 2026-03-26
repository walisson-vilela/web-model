import React, { useMemo, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Resolver, UseFormReturn, useForm } from 'react-hook-form'

import getSchema from './schema'
import { FormInterface, InterruptEventModalProps } from './types'

type TInterruptEventContext = InterruptEventModalProps & {
  form: UseFormReturn<FormInterface> & {
    isInvalid: (field: keyof FormInterface) => boolean
  }
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const InterruptEventContext = React.createContext({} as TInterruptEventContext)

const defaultValues: FormInterface = {
  activate: true,
  classification: null,
  file: null,
} as const

export const InterruptEventProvider = ({
  children,
  ...props
}: React.PropsWithChildren<{
  close: () => void
  reload: () => void
  userId: number
  eventId: number
}>) => {
  const [loading, setLoading] = useState(false)

  const schema = getSchema()
  const resolver = yupResolver(schema) as never as Resolver<FormInterface>

  const form = useForm<FormInterface>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  })

  const setValue: typeof form.setValue = (field, value, options) => {
    form.setValue(field, value as never, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
      ...(options || {}),
    })
  }

  const isInvalid: TInterruptEventContext['form']['isInvalid'] = useMemo(
    () => (field) => {
      return form.formState.isSubmitted && field in form.formState.errors
    },
    [form.formState],
  )

  return (
    <InterruptEventContext.Provider
      children={children}
      value={{
        ...props,
        form: { ...form, isInvalid, setValue },
        loading: [loading, setLoading],
      }}
    />
  )
}

const useInterruptEventContext = () => React.useContext(InterruptEventContext)

export default useInterruptEventContext
