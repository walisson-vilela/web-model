import React, { useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { isAxiosError } from 'axios'
import {
  KeepStateOptions,
  Resolver,
  UseFormReturn,
  useForm,
} from 'react-hook-form'

import { ModalState } from '../../../../components/MwModal'
import useRouteTabContext from '../../../../routes'
import { RouteTabProvider } from '../../../../routes/types'
import { numberOrDefault } from '../../../../utils/Formatters'
import { isOneOf } from '../../../../utils/Validators'
import useDirty from '../../../../utils/hooks/useDirty'
import { getLicenses } from '../../../hooks/useLicenses'
import { Licenses } from '../../../hooks/useLicenses/interfaces'
import { isObject } from '../../../utils/validators'
import useHomeContext from '../../Home/context'
import { PERSON_STATUS } from '../labels'

import { comparators } from './constants'
import { Data, Form } from './interfaces'
import { formParser } from './parser'
import schema from './schema'
import { getUser } from './services'

interface ContextInterface {
  form: Omit<UseFormReturn<Form>, 'reset'> & {
    reset: (values: Partial<Form>, keepStateOptions?: KeepStateOptions) => void
    isInvalid: (field: keyof Form) => boolean
  }
  setValueOptions: {
    shouldDirty: boolean
    shouldValidate: boolean
  }

  originals: Form
  dirtyFields: (keyof Form)[]
  isDirty: boolean

  data: Data
  licenses: Licenses
  loadData: () => Promise<void>
  loadLicenses: () => Promise<void>

  closeTab: (redirect?: string | 0) => void
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  modal: [
    ModalState | null,
    React.Dispatch<React.SetStateAction<ModalState | null>>,
  ]

  disabled: boolean
}

const FormContext = React.createContext<ContextInterface>(
  {} as ContextInterface,
)

const useFormContext = () => React.useContext(FormContext)

const setValueOptions = {
  shouldDirty: true,
  shouldValidate: true,
}

export const Provider: RouteTabProvider<{ id: string }> = (props) => {
  const {
    data: { route },
  } = props

  const { close: closeTab, setDirty } = useRouteTabContext(route)

  const id = numberOrDefault(route.match.params.id, 0)

  const { contractor } = useHomeContext()

  const [originals, setOriginals] = useState<Form>(formParser(null))
  const [data, setData] = useState<Data>({
    id: 0,
    name: '',
    document: '',
    registration: null,
    event_count: 0,
    modifier: null,
    event_user: null,
    pis: '',
  })
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<ModalState | null>(null)
  const [licenses, setLicenses] = useState<Licenses>({})

  const resolver = yupResolver(schema) as never as Resolver<Form>

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

  const isInvalid = useCallback(
    (field: keyof Form) => {
      return form.formState.submitCount > 0 && field in form.formState.errors
    },
    [form.formState],
  )

  const { dirty: isDirty, fields: dirtyFields } = useDirty(
    watch(),
    originals,
    comparators,
  )

  useEffect(() => {
    setDirty(isDirty)
  }, [isDirty])

  const reset: ContextInterface['form']['reset'] = (
    values,
    keepStateOptions,
  ) => {
    form.reset(values, keepStateOptions)
    setOriginals((prev) => ({ ...prev, ...values }))
  }

  const loadLicenses = useCallback(async () => {
    setLoading(true)

    if (!contractor.id) return

    try {
      const licenses = await getLicenses(contractor.id)
      setLicenses(licenses)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [contractor.id])

  const loadData = useCallback(async () => {
    setLoading(true)

    if (!contractor.id) return

    try {
      const [{ form, data }, licenses] = await Promise.all([
        await getUser(id),
        await getLicenses(contractor.id),
      ])

      const { status, role, hierarchies } = form

      if (
        isOneOf(status, [PERSON_STATUS.A.value, PERSON_STATUS.T.value]) &&
        role !== null &&
        role.access_level_id in licenses
      ) {
        hierarchies.forEach((h) => {
          if (h.hierarchy_id in licenses[role.access_level_id]) {
            licenses[role.access_level_id][h.hierarchy_id].consumed -= 1
          }
        })
      }

      reset(form)
      setData(data)
      setLicenses(licenses)
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
              onClick: () => closeTab('/main/users/home'),
            },
          ],
        })
        return
      }

      console.error(e)
    }

    setLoading(false)
  }, [id, contractor.id])

  useEffect(() => {
    loadData()
  }, [loadData])

  const setValue: typeof form.setValue = (name, value, options) => {
    form.setValue(name, value as never, {
      ...setValueOptions,
      ...(options || {}),
    })
  }

  const status = watch('status')
  const disabled = status === PERSON_STATUS.P.value

  return (
    <FormContext.Provider
      value={{
        form: { ...form, setValue, reset, isInvalid },
        setValueOptions,

        originals,
        dirtyFields,
        isDirty,

        data,
        licenses,
        loadData,
        loadLicenses,

        closeTab,
        loading: [loading, setLoading],
        modal: [modal, setModal],

        disabled,
      }}
      children={props.children}
    />
  )
}

export default useFormContext
