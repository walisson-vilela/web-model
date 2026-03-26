import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

import { UseFormReturn, useForm } from 'react-hook-form'

import { Bound } from '../../../../../../../components/GoogleMap/interfaces'
import { getAddressByCoordinates } from '../../../../../../../services/address'
import { isRequired } from '../../../../../../../utils/Validators'
import {
  AddressData,
  Coordinates,
} from '../../../../../../pages/Contractors/contractors/Form/types'
import { toRegister } from '../../functions'
import { Form, WithFormProps } from '../../interface'

import resolver, { schemaToConfirm } from './schema'

interface IWithFormContext {
  form: UseFormReturn<Form, unknown, undefined>
  fieldIsInvalid: (f: keyof Form) => boolean
  fieldsValidate: (name: keyof (typeof schemaToConfirm)['fields']) => boolean
  wasSearched: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  isSearchered: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  isFieldFilled: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  isValidToConfirm: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  polygon: [
    Omit<Bound, 'radius'>[] | undefined,
    React.Dispatch<React.SetStateAction<Omit<Bound, 'radius'>[] | undefined>>,
  ]
  setValue: <K extends keyof AddressData | keyof Coordinates>(
    field: K,
    value: Form[K],
  ) => void
  props: WithFormProps
  onDragEnd: (lat: number, lng: number) => Promise<void>
}

const WithFormContext = createContext<IWithFormContext>({} as IWithFormContext)

export const useWithFormContext = () => useContext(WithFormContext)

interface WithFormProviderProps {
  children: ReactNode
  props: WithFormProps
}

export const WithFormProvider = ({
  children,
  props,
}: WithFormProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [wasSearched, setWasSearched] = useState(false)
  const [polygon, setPolygon] = useState<WithFormProps['polygon'] | undefined>(
    props.polygon,
  )

  const [isSearchered, setIsSearchered] = useState<boolean>(false)
  const [isFieldFilled, setIsFieldFilled] = useState<boolean>(false)
  const [isValidToConfirm, setIsValidToConfirm] = useState<boolean>(false)

  const form = useForm<Form>({
    mode: 'onChange',
    defaultValues: props.value,
    resolver,
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const fieldIsInvalid = useCallback(
    (f: keyof Form): boolean => {
      return (
        form.formState.submitCount > 0 && f in form.formState.errors && !loading
      )
    },
    [form.formState.submitCount, form.formState.errors, loading],
  )

  const fieldsValidate = (
    name: keyof (typeof schemaToConfirm)['fields'],
  ): boolean => {
    return isRequired(schemaToConfirm, name)
  }

  const setValue = <K extends keyof Form>(field: K, value: Form[K]): void =>
    form.setValue(field, value as never, {
      shouldDirty: true,
      shouldValidate: true,
    })

  const reset = (v: Partial<Form>) => {
    form.reset(v)
    toRegister.forEach((f) => form.register(f))
  }

  const onDragEnd = async (lat: number, lng: number) => {
    setLoading(true)

    try {
      const values = {
        ...(await getAddressByCoordinates({ lat, lng })),
        lat,
        lng,
      }

      ;(Object.keys(values) as (keyof Form)[]).forEach((f) =>
        setValue(f, values[f as keyof typeof values] as Form[keyof Form]),
      )
      reset({ ...values })
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }
  return (
    <WithFormContext.Provider
      value={{
        isFieldFilled: [isFieldFilled, setIsFieldFilled],
        isValidToConfirm: [isValidToConfirm, setIsValidToConfirm],
        isSearchered: [isSearchered, setIsSearchered],
        wasSearched: [wasSearched, setWasSearched],
        loading: [loading, setLoading],
        form,
        fieldIsInvalid,
        fieldsValidate,
        polygon: [polygon, setPolygon],
        setValue,
        onDragEnd,
        props,
      }}
    >
      {children}
    </WithFormContext.Provider>
  )
}
