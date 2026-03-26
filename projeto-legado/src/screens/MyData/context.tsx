import React, { useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Resolver,
  SetValueConfig,
  UseFormReturn,
  useForm,
} from 'react-hook-form'

import {
  Common,
  IntlTelInputControl as IntlTelInput,
} from '../../components/IntlTelInput'
import useRouteTabContext from '../../routes'
import { RouteTabProvider } from '../../routes/types'
import { isObject } from '../../utils/Validators'

import { Data, Form, Info } from './interfaces'
import { formParser, requestParser } from './parser'
import getSchema from './schema'
import { getMe } from './services'

interface ContextForm extends UseFormReturn<Form> {
  setValueOptions: SetValueConfig
}

interface ContextInterface {
  form: ContextForm
  getIntlTelInput: (name: keyof Info, props?: Common) => JSX.Element
  data: Data
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  registerFields: () => void
}

const FormContext = React.createContext<ContextInterface>(
  {} as ContextInterface,
)

const useContext = () => React.useContext(FormContext)

const setValueOptions = {
  shouldDirty: true,
  shouldValidate: true,
}

export const Provider: RouteTabProvider = (props) => {
  const { setDirty: setTabDirty } = useRouteTabContext(props.data.route)

  const [data, setData] = useState<Data>(requestParser(null))
  const [loading, setLoading] = useState<boolean>(false)

  const resolver = yupResolver(getSchema()) as Resolver<Form>
  const form = useForm<Form>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: formParser(null),
    criteriaMode: 'all',
  })

  const { setValue, getValues, watch, control, register, reset } = form

  useEffect(() => {
    setTabDirty(form.formState.isDirty)
  }, [form.formState.isDirty])

  const registerFields = () => {
    const keys: (keyof Form)[] = ['avatar', 'phone', 'email', 'mobile_phone']

    keys.forEach((key) => {
      const value = getValues(key)
      if (value === undefined) {
        register(key)
      }
    })
  }

  const handleLoadData = useCallback(async () => {
    setLoading(true)

    try {
      const user = await getMe()
      const requestParsed = requestParser(user)

      const formParsed = formParser(requestParsed)
      reset(formParsed)
      setData(requestParsed)
      registerFields()
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    handleLoadData()
  }, [handleLoadData])

  const getIntlTelInput = (name: keyof Form, props?: Common): JSX.Element => {
    if (!isObject(props)) props = {}
    if (!('fluid' in props)) props.fluid = true
    if (!('direction' in props)) props.direction = 'bottom'

    return (
      <IntlTelInput
        name={name}
        watch={watch}
        setValue={setValue}
        control={control as never}
        {...props}
      />
    )
  }

  return (
    <FormContext.Provider
      value={{
        form: {
          ...form,
          setValueOptions,
        },
        getIntlTelInput,
        data,
        loading: [loading, setLoading],
        registerFields,
      }}
      children={props.children}
    />
  )
}

export default useContext
