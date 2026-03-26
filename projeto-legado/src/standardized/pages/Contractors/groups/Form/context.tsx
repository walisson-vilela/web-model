import React, { createContext, useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { isAxiosError } from 'axios'
import {
  KeepStateOptions,
  Resolver,
  SetValueConfig,
  UseFormReturn,
  useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { ModalState } from '../../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { RouteTabProvider } from '../../../../../routes/types'
import { getToken } from '../../../../../utils'
import { numberOrDefault } from '../../../../../utils/Formatters'
import { useDirty } from '../../../../../utils/hooks'
import { TYPE_MASTER } from '../../constants'

import comparators from './comparators'
import { formParser, requestParser } from './parser'
import getSchema from './schema'
import { getContractor, getContractorPeoples } from './services'
import { Data, Form } from './types'

interface ContextForm extends UseFormReturn<Form> {
  setValueOptions: SetValueConfig
  isInvalid: (field: keyof Form) => boolean
}

interface ContextInterface {
  form: ContextForm
  data: Data
  modal: ModalState | null
  setModal: (state: ModalState) => void
  userConnected: string
  isMaster: boolean
  viewMode?: boolean
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  dirty: {
    isDirty: boolean
    dirtyFields: (keyof Form)[]
  }
  loadData: (id: number | null) => Promise<void>
}

const FormContext = createContext<ContextInterface>({} as ContextInterface)

const useContext = () => React.useContext(FormContext)

const validateUserConnected = () => {
  const userConnect = window.localStorage.getItem('_GIV_LOGIN')
  if (!userConnect) {
    return ''
  }
  return userConnect
}
const userConnected = validateUserConnected()

const setValueOptions = {
  shouldDirty: true,
  shouldValidate: true,
}

export const Provider: RouteTabProvider<{ id?: string }> = (props) => {
  const {
    data: { route },
    setTab,
  } = props

  const token = getToken()
  const viewMode = token.payload.type !== TYPE_MASTER

  const id = numberOrDefault(route.match.params.id)

  const [data, setData] = useState<Data>(requestParser(null))
  const [loading, setLoading] = useState<boolean>(true)
  const [modal, setModal] = useState<ModalState>(null)

  const [isMaster, setIsMaster] = useState<boolean>(false)
  const [originals, setOriginals] = useState<Form>(formParser())

  // TODO: fix validation schema to remove type never
  const resolver = yupResolver(getSchema()) as never as Resolver<Form>
  const form = useForm<Form>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: formParser(),
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const { getValues, register, watch } = form

  const { dirty: isDirty, fields: dirtyFields } = useDirty(
    watch(),
    originals,
    comparators,
  )

  const reset = (
    values: Partial<Form>,
    keepStateOptions?: KeepStateOptions,
  ) => {
    form.reset(values, keepStateOptions)
    setOriginals((prev) => ({ ...prev, ...values }))
  }

  const registerFields = () => {
    const keys: (keyof Form)[] = ['group_associated', 'associated_users']

    keys.forEach((key) => {
      const value = getValues(key)
      if (value === undefined) {
        register(key)
      }
    })
  }

  useEffect(() => {
    registerFields()
  }, [])

  const loadData: ContextInterface['loadData'] = async (id) => {
    setLoading(true)

    try {
      const data = async () => {
        if (id) {
          return requestParser(await getContractor(id))
        }

        return requestParser(null, {
          contractor_peoples: await getContractorPeoples(),
        })
      }
      setData(await data())

      const form = formParser(await data())
      reset(form)
      registerFields()
    } catch (e) {
      console.error(e)

      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return
      }

      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }

  useEffect(() => {
    loadData(viewMode ? getToken().payload.contractor : id)
  }, [viewMode, id])

  useEffect(() => {
    if (viewMode) {
      setTab((prev) => ({
        ...prev,
        label: 'Conta e Agrupamento',
        data: {
          ...prev.data,
          dirty: isDirty,
        },
      }))
      return
    }

    if (id) {
      const isMaster = getToken().payload.account_master === id
      setTab((prev) => ({
        ...prev,
        ...(isMaster ? { label: 'Editar Conta Master' } : {}),
        data: {
          ...prev.data,
          dirty: isDirty,
        },
      }))
      setIsMaster(isMaster)
    } else {
      setTab((prev) => ({
        ...prev,
        label: 'Novo Agrupamento',
        data: {
          ...prev.data,
          dirty: isDirty,
        },
      }))
      setIsMaster(false)
    }
  }, [viewMode, id, isDirty])

  const isInvalid: ContextInterface['form']['isInvalid'] = useCallback(
    (field) =>
      field in form.formState.errors &&
      (field in form.formState.dirtyFields || form.formState.isSubmitted),
    [
      form.formState.errors,
      form.formState.dirtyFields,
      form.formState.isSubmitted,
    ],
  )

  return (
    <FormContext.Provider
      value={{
        form: {
          ...form,
          setValueOptions,
          isInvalid,
        },
        data,
        modal,
        setModal,
        userConnected,
        isMaster,
        viewMode,
        loading,
        setLoading,
        dirty: {
          isDirty,
          dirtyFields,
        },
        loadData,
      }}
      children={props.children}
    />
  )
}

export default useContext
