import React, { useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Resolver,
  SetValueConfig,
  UseFormReturn,
  useForm,
} from 'react-hook-form'

import { ModalState } from '../../../../components/MwModal'
import useRouteTabContext from '../../../../routes'
import {
  RouteTabContextProps,
  RouteTabProvider,
} from '../../../../routes/types'
import { keys, numberOrDefault } from '../../../../utils/Formatters'
import { arrayEquals } from '../../../../utils/Validators'
import { useDirty } from '../../../../utils/hooks'
import { Comparators } from '../../../../utils/hooks/useDirty'

import { Data, Form } from './interfaces'
import { formParser } from './parser'
import getSchema from './schema'
import { getBrand } from './services'

interface ContextInterface {
  form: UseFormReturn<Form> & {
    setValueOptions: SetValueConfig
  }
  dirtyFields: (keyof Form)[]
  data: Data
  loadData: (id: number) => Promise<void>
  modal: [
    ModalState | null,
    React.Dispatch<React.SetStateAction<ModalState | null>>,
  ]
  isInvalid: (field: keyof Form) => boolean

  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]

  closeTab: RouteTabContextProps['close']
}

const FormContext = React.createContext<ContextInterface>(
  {} as ContextInterface,
)

const useContext = () => React.useContext(FormContext)

const setValueOptions = {
  shouldDirty: true,
  shouldValidate: true,
}

const comparators: Comparators<Form> = {
  countries: (x, y) =>
    !arrayEquals(x, y, (x, y) => x.country_id === y.country_id),
}

export const Provider: RouteTabProvider<{ id: string }> = (props) => {
  const {
    data: { route },
    setTab,
  } = props

  const { close: closeTab } = useRouteTabContext(route)

  const id = numberOrDefault(route.match.params.id)

  const [data, setData] = useState<Data>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [modal, setModal] = useState<ModalState | null>(null)

  const [defaultValues, setDefaultValues] = useState<Form>(formParser(null))

  const resolver = yupResolver(getSchema()) as never as Resolver<Form>
  const form = useForm<Form>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const { setValue, getValues, register } = form

  const { dirty: isDirty, fields: dirtyFields } = useDirty(
    form.watch(),
    defaultValues,
    comparators,
  )

  const setValues = (
    values: Partial<Form>,
    config?: Parameters<typeof setValue>[2],
  ) => {
    keys(values).forEach((key) => {
      setValue(key, values[key], config)
    })
  }

  const registerFields = () => {
    const keys: (keyof Form)[] = ['file', 'countries']

    keys.forEach((key) => {
      const value = getValues(key)
      if (value === undefined) {
        register(key)
      }
    })
  }

  const loadData = async (id: number) => {
    setLoading(true)

    try {
      const data = await getBrand(id)

      setData(data)

      const values = formParser(data)
      setDefaultValues(values)

      registerFields()

      setValues(values)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (id) {
      loadData(id)
    }
  }, [id])

  useEffect(() => {
    setTab((prev) => ({
      ...prev,
      data: { ...prev.data, dirty: isDirty },
    }))
  }, [id, isDirty])

  const isInvalid: ContextInterface['isInvalid'] = useCallback(
    (field) => {
      return field in form.formState.errors && form.formState.submitCount > 0
    },
    [form.formState.errors, form.formState.submitCount],
  )

  return (
    <FormContext.Provider
      value={{
        form: {
          ...form,
          setValueOptions,
        },
        dirtyFields,
        modal: [modal, setModal],
        data,
        loadData,
        isInvalid,
        loading: [loading, setLoading],

        closeTab,
      }}
      children={props.children}
    />
  )
}

export default useContext
