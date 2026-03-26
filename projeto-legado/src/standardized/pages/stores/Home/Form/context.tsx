import React, { useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { GenericObject } from '@mw-kit/mw-ui/types'
import { isAxiosError } from 'axios'
import { Resolver, UseFormReturn, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ModalState } from '../../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import useRouteTabContext from '../../../../../routes'
import {
  RouteTabContextProps,
  RouteTabProvider,
} from '../../../../../routes/types'
import { keys, numberOrDefault } from '../../../../../utils/Formatters'
import useDirty, { Comparators } from '../../../../../utils/hooks/useDirty'

import * as Modals from './Modals'
import { Data, Form, IFormStores, Validations } from './interfaces'
import { formParser } from './parsers'
import buildSchema from './schema'
import { getStore } from './services'

interface ContextInterface {
  form: UseFormReturn<Form>
  originals: Form
  dirtyFields: (keyof Form)[]
  isInvalid: (field: keyof Form) => boolean
  reset: (values?: GenericObject) => void
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

  mode: IFormStores['mode']
  id: number | null
  data: Data | null
  loadData: (id: number | null) => Promise<void>

  modal: [ModalState | null, React.Dispatch<React.SetStateAction<ModalState>>]
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  createNotFoundModal: () => void

  closeTab: RouteTabContextProps['close']
}

const FormContext = React.createContext<ContextInterface>(
  {} as ContextInterface,
)

const comparators: Comparators<Form> = {
  segment: (x, y) => x?.id !== y?.id,
  market_flag: (x, y) => x?.id !== y?.id,
  typology: (x, y) => x?.id !== y?.id,
  classification: (x, y) => x?.id !== y?.id,
  source_address: () => false,
  manager_contact: (x, y) => keys(x).some((k) => x[k] !== y[k]),
  person_in_charge_1_contact: (x, y) => keys(x).some((k) => x[k] !== y[k]),
  person_in_charge_2_contact: (x, y) => keys(x).some((k) => x[k] !== y[k]),
}

const setValueOptions = {
  shouldDirty: true,
  shouldValidate: true,
}

export const Provider: RouteTabProvider<{ id?: string }> = (props) => {
  const {
    data: { route },
    setTab,
  } = props

  const mode =
    route.match.path.split('/')[3] === 'base' ? 'base-stores' : 'stores'

  const id = numberOrDefault(route.match.params.id)

  const { close: closeTab } = useRouteTabContext(route)

  const [loading, setLoading] = useState<boolean>(true)
  const [modal, setModal] = useState<ModalState | null>(null)

  const [originals, setOriginals] = useState<Form>(formParser(null, mode))
  const [data, setData] = useState<Data | null>(null)
  // this state must be in form provider
  const [validations, setValidations] = useState<Validations>({
    document: true,
    code: true,
    nickname: true,
  })

  const useValidation: ContextInterface['useValidation'] = (field) => {
    return [
      validations[field],
      (value) => {
        setValidations((prev) => ({ ...prev, [field]: value }))
      },
    ]
  }

  const resolver = yupResolver(
    buildSchema(originals),
  ) as never as Resolver<Form>

  const form = useForm<Form>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: formParser(null, mode),
    criteriaMode: 'all',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const { getValues, watch, reset, register } = form

  const { dirty: isDirty, fields: dirtyFields } = useDirty(
    watch(),
    originals,
    comparators,
  )

  const setValue: typeof form.setValue = (name, value, options) => {
    form.setValue(name, value as never, {
      ...setValueOptions,
      ...(options || {}),
    })
  }

  const registerFields = (): void => {
    const requiredFields: (keyof Form)[] = [
      'id',
      'status',
      'document',
      'fantasy_name',
      'company_name',
      'situation_name',
      'source_status',
      'code',
      'nickname',
      'segment',
      'market_flag',
      'typology',
      'classification',
      'checkout',
      'postal_code',
      'street_type',
      'street_address',
      'street_number',
      'complement',
      'sublocality',
      'city',
      'state',
      'address_lat',
      'address_lng',
      'lat',
      'lng',
      'radius',
      'geolocation_status',
      'geolocation_at',
      'geolocation_by_id',
      'geolocation_by_name',
      'geolocation_tolerance',
      'phone',
      'email',
      'manager_contact',
      'person_in_charge_1_contact',
      'person_in_charge_2_contact',
    ]

    requiredFields.forEach((key) => {
      if (!getValues(key)) {
        register(key)
      }
    })
  }

  const createNotFoundModal = () => {
    setModal({
      title: 'Notificação',
      content: 'Registro não encontrado',
      buttonType: 'MwButton',
      actions: [
        {
          content: 'Ir para Home',
          onClick: () =>
            closeTab(
              mode === 'base-stores'
                ? '/main/stores/base'
                : '/main/stores/home',
            ),
        },
      ],
    })
  }

  const loadData = async (id: number | null) => {
    setLoading(true)

    try {
      if (id !== null) {
        const { responseForm, responseData, unified_log } = await getStore(
          id,
          mode,
        )

        if (unified_log) {
          setModal(
            <Modals.UnifiedPDVModal close={() => setModal(null)} id={id} />,
          )
        }

        if (
          mode === 'base-stores' &&
          responseForm.source_status === 'UPDATED'
        ) {
          setModal(
            <Modals.AddressUpdateModal
              originals={responseForm}
              onClose={() => setModal(null)}
            />,
          )
        }

        reset(responseForm)
        setOriginals(responseForm)
        setData(responseData)
      }
    } catch (e) {
      if (id && isAxiosError(e) && e.response?.status === 404) {
        createNotFoundModal()
      } else {
        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
      }
    }

    registerFields()
    setLoading(false)
  }

  const isInvalid = useCallback(
    (field: keyof Form) =>
      form.formState.submitCount > 0 && field in form.formState.errors,
    [form.formState.submitCount, form.formState.errors],
  )

  useEffect(() => {
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

  return (
    <FormContext.Provider
      value={{
        form: { ...form, setValue },
        originals,
        dirtyFields,
        isInvalid,
        reset,
        setValueOptions,
        validations: [validations, setValidations],
        useValidation,

        mode,
        id,
        data,
        loadData,

        modal: [modal, setModal],
        loading: [loading, setLoading],
        createNotFoundModal,

        closeTab,
      }}
      children={props.children}
    />
  )
}

const useFormContext = () => React.useContext(FormContext)

export default useFormContext
