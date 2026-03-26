import React, { useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { isAxiosError } from 'axios'
import {
  type KeepStateOptions,
  type Resolver,
  type UseFormReturn,
  useForm,
} from 'react-hook-form'

import type { ModalState } from '../../../../components/MwModal'
import useRouteTabContext from '../../../../routes'
import type {
  RouteTabContextProps,
  RouteTabProvider,
} from '../../../../routes/types'
import { numberOrDefault } from '../../../../utils/Formatters'
import useDirty from '../../../../utils/hooks/useDirty'
import { isObject } from '../../../utils/validators'

import type { Data, Form, Validations } from './interfaces'
import { dataParser, formParser } from './parser'
import schema from './schema'
import { getPerson, setting250 } from './services'

interface ContextInterface {
  modal: [
    ModalState | null,
    React.Dispatch<React.SetStateAction<ModalState | null>>,
  ]
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  form: UseFormReturn<Form> & {
    isInvalid: (field: keyof Form) => boolean
  }
  data: Data | null

  closeTab: RouteTabContextProps['close']
  loadData: (id: number) => Promise<void>

  originals: Form
  dirtyFields: (keyof Form)[]
  isDirty: boolean
  setValueOptions: {
    shouldDirty: boolean
    shouldValidate: boolean
  }

  validations: [Validations, React.Dispatch<React.SetStateAction<Validations>>]
  useValidation: (
    field: keyof Validations,
  ) => [
    Validations[keyof Validations],
    (value: Validations[keyof Validations]) => void,
  ]

  reset: (values: Partial<Form>, keepStateOptions?: KeepStateOptions) => void
  isInvalid: (field: keyof Form) => boolean
  id: number | null
  registrationRequired: boolean
  loadRegistrationRequired: () => Promise<void>
  pisRequired: boolean
}

const FormContext = React.createContext<ContextInterface>(
  {} as ContextInterface,
)

const useFormContext = () => React.useContext(FormContext)

export const setValueOptions = {
  shouldDirty: true,
  shouldValidate: true,
}

export const Provider: RouteTabProvider<{ id: string }> = (props) => {
  const {
    data: { route },
    setTab,
  } = props

  const { close: closeTab, setDirty } = useRouteTabContext(route)

  const id = numberOrDefault(route.match.params.id)

  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState<ModalState>(null)
  const [data, setData] = useState<Data | null>(null)
  const [registrationRequired, setRegistrationRequired] =
    useState<boolean>(false)

  const [originals, setOriginals] = useState<Form>(formParser(null))
  const [validations, setValidations] = useState<Validations>({
    document: true,
    registration: true,
    pis: true,
  })
  const [pisRequired, setPisRequired] = useState(false)
  const useValidation: ContextInterface['useValidation'] = (field) => {
    return [
      validations[field],
      (value) => {
        setValidations((prev) => ({ ...prev, [field]: value }))
      },
    ]
  }

  const resolver = yupResolver(
    schema(registrationRequired, pisRequired),
  ) as never as Resolver<Form>

  const form = useForm<Form>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: originals,
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const { watch } = form

  const { dirty: isDirty, fields: dirtyFields } = useDirty(watch(), originals)

  useEffect(() => {
    setDirty(isDirty)
  }, [isDirty])

  const isInvalid = useCallback(
    (field: keyof Form) => {
      return form.formState.submitCount > 0 && field in form.formState.errors
    },
    [form.formState],
  )

  const reset = (
    values: Partial<Form>,
    keepStateOptions?: KeepStateOptions,
  ) => {
    form.reset(values, keepStateOptions)
    setOriginals((prev) => ({ ...prev, ...values }))
  }

  const loadRegistrationRequired = async () => {
    setLoading(true)

    try {
      const registrationRequired = await setting250()
      setRegistrationRequired(registrationRequired)
    } catch (e) {
      console.error(e)
      setRegistrationRequired(false)
    }

    setLoading(false)
  }

  const isPISRequired = (response: unknown): boolean => {
    return (
      isObject(response) &&
      isObject(response.user) &&
      response.user.deleted_at === null &&
      isObject(response.user.work_shift) &&
      response.user.work_shift.electronic_point === true
    )
  }

  const loadData = async (id: number) => {
    setLoading(true)

    try {
      const [response, registrationRequired] = await Promise.all([
        getPerson(id),
        setting250(),
      ])
      setPisRequired(isPISRequired(response))
      const form = formParser(response)
      const data = dataParser(response)

      reset(form)
      setData(data)

      setRegistrationRequired(registrationRequired)
    } catch (e) {
      if (
        isAxiosError(e) &&
        isObject(e.response) &&
        e.response.status === 404
      ) {
        setModal({
          title: 'Notificação',
          content: 'Registro não encontrado',
          buttonType: 'MwButton',
          actions: [
            {
              content: 'Ir para Home',
              onClick: () => closeTab('/main/users/people'),
            },
          ],
        })
        return
      }

      console.error(e)
      setRegistrationRequired(false)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!id) return
    loadData(id)
  }, [id])

  useEffect(() => {
    setTab((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        dirty: isDirty,
      },
    }))
  }, [id, isDirty])

  const setValue: typeof form.setValue = (name, value, options) => {
    form.setValue(name, value as never, {
      ...setValueOptions,
      ...(options || {}),
    })
  }

  return (
    <FormContext.Provider
      value={{
        form: { ...form, setValue, isInvalid },
        data,
        modal: [modal, setModal],
        reset,
        originals,
        dirtyFields,
        isDirty,
        loadData,

        closeTab,
        loading: [loading, setLoading],
        setValueOptions,
        isInvalid,
        id,
        registrationRequired,
        loadRegistrationRequired,
        validations: [validations, setValidations],
        useValidation,
        pisRequired,
      }}
    >
      {props.children}
    </FormContext.Provider>
  )
}

export default useFormContext
