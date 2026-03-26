import React, { useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Resolver,
  SetValueConfig,
  UseFormReturn,
  useForm,
} from 'react-hook-form'

import { RouteTabProvider } from '../../../routes/types'
import { numberOrDefault } from '../../../utils/Formatters'

import { Data, Form } from './interfaces'
import { formParser } from './parsers'
import { schema } from './schema'
import { getProduct } from './services'

interface Context {
  data: Data
  form: UseFormReturn<Form>
  setValueOptions: SetValueConfig
  isInvalid: (key: keyof Form) => boolean
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  loadData: () => Promise<void>
}

const FormContext = React.createContext<Context>({} as Context)

const useContext = () => React.useContext(FormContext)

const setValueOptions: SetValueConfig = {
  shouldDirty: true,
  shouldValidate: true,
}

export const Provider: RouteTabProvider<{ id: string }> = (props) => {
  const {
    data: { route },
    setTab,
  } = props

  const id = numberOrDefault(route.match.params.id)

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Data | null>(null)

  const resolver = yupResolver(schema) as unknown as Resolver<Form>
  const form = useForm<Form>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: formParser(),
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const { getValues, reset, register } = form

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      if (id) {
        const { data, formData } = await getProduct(id)
        reset(formData)
        setData(data)
      }
      registerFields()
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [id])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    setTab((prev) => ({
      ...prev,
      data: { ...prev.data, dirty: form.formState.isDirty },
    }))
  }, [id, form.formState.isDirty])

  const registerFields = () => {
    const keys: (keyof Form)[] = [
      'brand_id',
      'classification_id',
      'code',
      'description',
      'ean_13',
      'files',
      'measurement',
      'measurement_unit',
      'name',
      'notify_price',
      'price_max',
      'price_min',
      'product_line_id',
      'status',
      'type',
    ]

    keys.forEach((key) => {
      if (getValues(key) === undefined) register(key)
    })
  }

  useEffect(() => {
    registerFields()
  }, [])

  const isInvalid: Context['isInvalid'] = useCallback(
    (field) => {
      return field in form.formState.errors && form.formState.submitCount > 0
    },
    [form.formState.errors, form.formState.submitCount],
  )

  return (
    <FormContext.Provider
      value={{
        form,
        data,
        setValueOptions,
        isInvalid,
        loading: [loading, setLoading],
        loadData,
      }}
      children={props.children}
    />
  )
}

export default useContext
