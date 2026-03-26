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
import { ContractInfoInterface } from '../../../../../screens/ContractorClient/interfaces'
import { getToken } from '../../../../../utils'
import { numberOrDefault } from '../../../../../utils/Formatters'
import { useDirty } from '../../../../../utils/hooks'
import { TYPE_MASTER } from '../../constants'

import comparators from './comparators'
import { HIERARCHIES } from './constants'
import { formParser, parseValues, requestParser } from './parsers'
import getSchema from './schema'
import {
  getContractor,
  getContractorPeoples,
  getLicensesAndContractInfo,
} from './services'
import { Data, Form } from './types'

interface ContextForm extends UseFormReturn<Form> {
  setValueOptions: SetValueConfig
  isInvalid: (field: keyof Form) => boolean
}

interface ContextInterface {
  form: ContextForm
  data: Data
  modal: ModalState | null
  setModal: React.Dispatch<React.SetStateAction<ModalState | null>>
  contractInfo: ContractInfoInterface
  isMaster: boolean
  viewMode?: boolean
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  loadData: (id: number | null) => Promise<void>
  originals: Form
  dirty: {
    isDirty: boolean
    dirtyFields: (keyof Form)[]
  }
}

const FormContext = createContext<ContextInterface>({} as ContextInterface)

const useContext = () => React.useContext(FormContext)

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

  const [data, setData] = useState<Data>(requestParser())

  const [loading, setLoading] = useState<boolean>(true)
  const [modal, setModal] = useState<ModalState>(null)
  const [isMaster, setIsMaster] = useState<boolean>(false)
  const [originals, setOriginals] = useState<Form>(formParser())
  const [contractInfo, setContractInfo] = useState<ContractInfoInterface>(
    {} as ContractInfoInterface,
  )

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
  const reset = (
    values: Partial<Form>,
    keepStateOptions?: KeepStateOptions,
  ) => {
    form.reset(values, keepStateOptions)
    setOriginals((prev) => ({ ...prev, ...values }))
  }

  const registerFields = () => {
    const keys: (keyof Form)[] = [
      'active',

      'avatar', // avatar

      // basic data
      'document',
      'name',
      'subdomain',
      'occupationArea',
      'sharedModel',

      // address
      'postal_code', // cep
      'street_type', // tipo de logradouro
      'street_address', // endereco
      'street_number', // numero
      'complement', // complemento
      'sublocality', // bairro
      'city', // cidade
      'state', // UF

      // geolocation
      'lat', // latitude
      'lng', // longitude
      'radius', // raio
      'geolocation_at', // data geolocalizacao
      'geolocation_by_id', // id do usuario que fez a geolocalizacao
      'geolocation_by_name', // nome do usuario que fez a geolocalizacao

      'responsibleAccount',
      'user_associated',

      'termsOfUse',
      'privacyPolicy',

      'licenses',

      'forms',

      'ppt_templates',
    ]

    keys.forEach((key) => {
      const value = getValues(key)
      if (value === undefined) {
        register(key)
      }
    })
  }

  const loadData: ContextInterface['loadData'] = async (id) => {
    setLoading(true)

    try {
      const { licenses, contractInfo } = await getLicensesAndContractInfo()

      const args: Parameters<typeof requestParser> = id
        ? [
            await getContractor(id),
            {
              licenses: {
                hierarchies: [],
                licenses,
                values: {},
              },
            },
          ]
        : [
            null,
            {
              licenses: {
                hierarchies: [...HIERARCHIES],
                licenses,
                values: parseValues([...HIERARCHIES], licenses),
              },
              contractor_peoples: await getContractorPeoples(),
            },
          ]

      const data = requestParser(...args)

      setData(data)
      setContractInfo(contractInfo)

      const form = formParser(data)
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

  const { dirty: isDirty, fields: dirtyFields } = useDirty(
    watch(),
    originals,
    comparators,
  )

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
        label: 'Nova Conta',
        data: {
          ...prev.data,
          dirty: isDirty,
        },
      }))
      setIsMaster(false)
    }
  }, [viewMode, id, isDirty])

  useEffect(() => {
    registerFields()
  }, [])

  const isInvalid: Parameters<
    typeof FormContext.Provider
  >[0]['value']['form']['isInvalid'] = useCallback(
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
        contractInfo,
        setModal,
        isMaster,
        viewMode,
        loadData,
        loading: [loading, setLoading],
        modal,
        originals,
        dirty: {
          isDirty,
          dirtyFields,
        },
      }}
      children={props.children}
    />
  )
}

export default useContext
