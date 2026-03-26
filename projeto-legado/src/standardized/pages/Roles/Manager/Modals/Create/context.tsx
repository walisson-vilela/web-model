import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Resolver,
  SetValueConfig,
  UseFormReturn,
  useForm,
} from 'react-hook-form'

import useDirty, { Comparators } from '../../../../../../utils/hooks/useDirty'
import useLicenses from '../../../../../hooks/useLicenses'
import { BodyInterface } from '../../interfaces'
import { formParser } from '../../parser'

import { Form, Licenses } from './interfaces'
import buildSchema from './schema'

type Validations = {
  [k in keyof Pick<Form, 'name'>]: boolean | null
}

const setValueOptions = {
  shouldDirty: true,
  shouldValidate: true,
}

const comparators: Comparators<Form> = {
  id: (a, b) => a !== b,
  name: (a, b) => a !== b,
  access_level_id: (a, b) => a !== b,
  internal_access: (a, b) => a !== b,
  hierarchies: (a, b) => {
    if (a.length !== b.length) return true
    return a.some((a) => {
      return !b.some((b) => b.hierarchy_id === a.hierarchy_id)
    })
  },
}

interface ContextForm extends UseFormReturn<Form> {
  setValueOptions: SetValueConfig
  isInvalid: (field: keyof Form) => boolean
}

interface IModalContext {
  form: ContextForm
  originals: Form

  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  dirtyFields: (keyof Form)[]
  isDirty: boolean
  validations: [Validations, React.Dispatch<React.SetStateAction<Validations>>]
  useValidation: (
    field: keyof Validations,
  ) => [
    Validations[keyof Validations],
    (value: Validations[keyof Validations]) => void,
  ]
  licenses: Licenses
  getUserLicenses: () => Promise<void>
  item?: BodyInterface
}

const ContextModals = createContext<IModalContext>({} as IModalContext)

interface ModalsProviderProps {
  children: ReactNode
  item?: BodyInterface
}
export const ModalsProvider = (props: ModalsProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [validations, setValidations] = useState<Validations>({
    name: true,
  })

  const useValidation: IModalContext['useValidation'] = (field) => {
    return [
      validations[field],
      (value) => {
        setValidations((prev) => ({ ...prev, [field]: value }))
      },
    ]
  }

  const { children, item } = props

  const [originals, setOriginals] = useState<Form>(() => {
    return item
      ? {
          id: item.id,
          name: item.name,
          access_level_id: item.access_level_id,
          internal_access: item.internal_access,
          user_count: item.user_count,
          hierarchies: item.hierarchies,
        }
      : formParser(null)
  })

  const resolver = yupResolver(buildSchema) as never as Resolver<Form>

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

  const reset: typeof form.reset = (values, keepStateOptions) => {
    form.reset(values, keepStateOptions)
    setOriginals((prev) => ({ ...prev, ...values } as Form))
  }

  const { dirty: isDirty, fields: dirtyFields } = useDirty(
    watch(),
    originals,
    comparators,
  )

  const isInvalid = useCallback(
    (field: keyof Form) =>
      form.formState.submitCount > 0 && field in form.formState.errors,
    [form.formState.submitCount, form.formState.errors],
  )

  const setValue: typeof form.setValue = (name, value, options) => {
    form.setValue(name, value as never, {
      ...setValueOptions,
      ...(options || {}),
    })
  }

  const initialLicenses = useCallback((): Licenses => {
    if (!item || item.user_count < 1) return {}
    return {
      [item.access_level_id]: item.hierarchies.reduce<Licenses[number]>(
        (licenses, e) => {
          return {
            ...licenses,
            [e.hierarchy_id]: {
              consumed: item.user_count * -1,
              reserved: 0,
            },
          }
        },
        {},
      ),
    }
  }, [item])

  const [licenses, getUserLicenses] = useLicenses(setLoading, initialLicenses)

  return (
    <ContextModals.Provider
      value={{
        form: {
          ...form,
          reset,
          setValue,
          setValueOptions,
          isInvalid,
        },
        originals,
        isDirty,
        dirtyFields,
        loading: [loading, setLoading],

        validations: [validations, setValidations],
        useValidation,
        licenses,
        getUserLicenses,
        item,
      }}
    >
      {children}
    </ContextModals.Provider>
  )
}

const useModalsContext = () => useContext(ContextModals)

export default useModalsContext
