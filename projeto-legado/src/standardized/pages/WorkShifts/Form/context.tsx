import React, { useCallback, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  type KeepStateOptions,
  type Resolver,
  type UseFormReturn,
  useForm,
} from 'react-hook-form'

import type { ModalState } from '../../../../components/MwModal'
import useDirty, { type Comparators } from '../../../../utils/hooks/useDirty'

import { auxFormConstant, mainFormConstant } from './constants'
import type { AuxForm, Errors, MainForm } from './interfaces'
import { formParser } from './parsers'
import schemaAuxForm from './schemas/auxForm'
import schemaMainForm from './schemas/mainForm'
import { getWorkShitById } from './services'

const comparators: Comparators<MainForm> = {
  weekdays: (a, b) => {
    if (a.length !== b.length) return true
    return a.some((a) => {
      return b.some((b) => {
        if (a.weekday !== b.weekday) return false
        if (a.starts_at !== b.starts_at || a.ends_at !== b.ends_at) return true
        if (a.intervals.length !== b.intervals.length) return true

        const intervals = a.intervals.some((a) => {
          return !b.intervals.some((b) => {
            const flag = a.flag === b.flag
            const name = a.name === b.name
            const limit = a.start_limit === b.start_limit
            const start = a.starts_at === b.starts_at
            const end = b.ends_at === a.ends_at

            return flag && name && limit && start && end
          })
        })
        return intervals
      })
    })
  },
}

interface ContextInterface {
  modal: [
    ModalState | null,
    React.Dispatch<React.SetStateAction<ModalState | null>>,
  ]
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  errors: [
    Errors<MainForm & AuxForm>,
    React.Dispatch<React.SetStateAction<Errors<MainForm & AuxForm>>>,
  ]
  form: UseFormReturn<MainForm> & {
    isInvalid: (field: keyof MainForm) => boolean
  }
  auxForm: UseFormReturn<AuxForm> & {
    isInvalid: (field: keyof AuxForm) => boolean
  }

  loadData: (id?: number) => Promise<void>

  originals: MainForm
  dirtyFields: (keyof MainForm)[]
  isDirty: boolean

  dirtyFieldsAux: (keyof AuxForm)[]
  isDirtyAux: boolean
  setValueOptions: {
    shouldDirty: boolean
    shouldValidate: boolean
  }

  reset: (
    values: Partial<MainForm>,
    keepStateOptions?: KeepStateOptions,
  ) => void
  resetAux: (
    values: Partial<AuxForm>,
    keepStateOptions?: KeepStateOptions,
  ) => void
  isInvalid: (field: keyof MainForm) => boolean
  isAuxInvalid: (field: keyof AuxForm) => boolean
}

const FormContext = React.createContext<ContextInterface>(
  {} as ContextInterface,
)

const useFormContext = () => React.useContext(FormContext)

export const setValueOptions = {
  shouldDirty: true,
  shouldValidate: true,
}
interface Props {
  children: React.ReactNode
}

export const Provider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Errors<MainForm & AuxForm>>({})
  const [modal, setModal] = useState<ModalState>(null)
  const [originals, setOriginals] = useState<MainForm>(formParser(null))
  const resolver = yupResolver(schemaMainForm()) as never as Resolver<MainForm>
  const resolverAuxForm = yupResolver(
    schemaAuxForm(),
  ) as never as Resolver<AuxForm>

  const form = useForm<MainForm>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: mainFormConstant,
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const auxForm = useForm<AuxForm>({
    resolver: resolverAuxForm,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: auxFormConstant,
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const { watch } = form
  const { watch: watchAux } = auxForm

  const { dirty: isDirty, fields: dirtyFields } = useDirty(
    watch(),
    originals,
    comparators,
  )
  const { dirty: isDirtyAux, fields: dirtyFieldsAux } = useDirty(
    watchAux(),
    auxFormConstant,
  )

  const reset = (
    values: Partial<MainForm>,
    keepStateOptions?: KeepStateOptions,
  ) => {
    form.reset(values, keepStateOptions)
    setOriginals((prev) => ({ ...prev, ...values }))
  }

  const resetAux = (
    values: Partial<AuxForm>,
    keepStateOptions?: KeepStateOptions,
  ) => {
    auxForm.reset(values, keepStateOptions)
  }

  const setValue: typeof form.setValue = (name, value, options) => {
    form.setValue(name, value as never, {
      ...setValueOptions,
      ...(options || {}),
    })
  }

  const setAuxValue: typeof auxForm.setValue = (name, value, options) => {
    auxForm.setValue(name, value as never, {
      ...setValueOptions,
      ...(options || {}),
    })
  }

  const isInvalid = useCallback(
    (field: keyof MainForm) => {
      return form.formState.submitCount > 0 && field in form.formState.errors
    },
    [form.formState],
  )

  const isAuxInvalid = useCallback(
    (field: keyof AuxForm) => {
      return (
        auxForm.formState.submitCount > 0 && field in auxForm.formState.errors
      )
    },
    [auxForm.formState],
  )

  const loadData = useCallback(async (id?: number) => {
    try {
      if (id) {
        setLoading(true)
        const response = await getWorkShitById(id)

        reset(response)
        setLoading(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <FormContext.Provider
      value={{
        form: { ...form, setValue, isInvalid },
        auxForm: { ...auxForm, setValue: setAuxValue, isInvalid: isAuxInvalid },
        modal: [modal, setModal],
        errors: [error, setError],
        reset,
        resetAux,
        originals,
        dirtyFields,
        isDirty,

        dirtyFieldsAux,
        isDirtyAux,
        loadData,
        loading: [loading, setLoading],
        setValueOptions,
        isInvalid,
        isAuxInvalid,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export default useFormContext
