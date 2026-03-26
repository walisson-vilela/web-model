import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Resolver, UseFormReturn, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  Common,
  IntlTelInputControl as IntlTelInput,
} from '../../components/IntlTelInput'
import { ErrorStyle, ToasterContent } from '../../components/Toaster'
import useRouteTabContext from '../../routes'
import { RouteTabProvider } from '../../routes/types'
import { keys, notEmptyStringOrDefault } from '../../utils/Formatters'
import { isObject } from '../../utils/Validators'
import { useDirty } from '../../utils/hooks'

import {
  ContractInfoInterface,
  DataInterface,
  FormInfoInterface,
  FormInterface,
  MasterAdminInterface,
} from './interfaces'
import parser from './parser'
import getSchema from './schema'
import {
  getClient,
  getClientId,
  getContractInfo,
  getMasterAdmin,
} from './services'

interface ContextInterface {
  form: UseFormReturn<FormInterface>
  getIntlTelInput: (
    name: keyof FormInfoInterface,
    props?: Common,
  ) => JSX.Element
  data: DataInterface
  loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  masterAdmin: MasterAdminInterface
  contractInfo: ContractInfoInterface
  isDirty: boolean
  load: () => Promise<void>
  onClickCancel: () => void
}

const FormContext = React.createContext<ContextInterface>(
  {} as ContextInterface,
)

const useContext = () => React.useContext(FormContext)

export const Provider: RouteTabProvider = (props) => {
  const { setDirty: setTabDirty } = useRouteTabContext(props.data.route)

  const [masterAdmin, setMasterAdmin] = useState<MasterAdminInterface>(
    {} as MasterAdminInterface,
  )
  const [contractInfo, setContractInfo] = useState<ContractInfoInterface>(
    {} as ContractInfoInterface,
  )

  const [data, setData] = useState<DataInterface>({} as DataInterface)
  const [defaultValues, setDefaultValues] = useState<FormInterface>({
    // general contact
    phone1: '',
    phone2: '',
    email: '',

    // master administrator
    administrator_phone: '',

    // financial contact
    client_contact_4_name: '',
    client_contact_4_phone1: '',
    client_contact_4_phone2: '',
    client_contact_4_email: '',

    // complement data - Sponsor
    client_contact_6_name: '',
    client_contact_6_phone1: '',
    client_contact_6_phone2: '',
    client_contact_6_email: '',

    // complement data - Ponto Focal
    client_contact_8_name: '',
    client_contact_8_phone1: '',
    client_contact_8_phone2: '',
    client_contact_8_email: '',

    // complement data - TI
    client_contact_10_name: '',
    client_contact_10_phone1: '',
    client_contact_10_phone2: '',
    client_contact_10_email: '',

    // complement data - Compras
    client_contact_12_name: '',
    client_contact_12_phone1: '',
    client_contact_12_phone2: '',
    client_contact_12_email: '',
  })

  const [loading, setLoading] = useState<boolean>(true)

  // TODO: fix validation schema to remove type never
  const resolver = yupResolver(getSchema()) as never as Resolver<FormInterface>
  const form = useForm<FormInterface>({
    resolver,
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues,
  }) as UseFormReturn<FormInterface>

  const { setValue, getValues, watch, trigger, control, register } = form

  const { dirty: isDirty } = useDirty({ ...watch() }, { ...defaultValues })

  useEffect(() => {
    setTabDirty(isDirty)
  }, [isDirty])

  const load = async () => {
    setLoading(true)

    try {
      const id = await getClientId()
      const response = await getClient(id)
      const masterAdmin = await getMasterAdmin()
      const contractInfo = await getContractInfo()

      setMasterAdmin(masterAdmin.data)
      setContractInfo(contractInfo.data)

      if (!response.success || !isObject(response.data))
        throw new Error('Request returned no success')

      const parsed = parser(response.data)
      setData(parsed)
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const setValues = (
    values: Partial<FormInterface>,
    config?: Parameters<typeof setValue>[2],
  ) => {
    keys(values).forEach((key) => {
      setValue(key, values[key], config)
    })
  }

  const registerFields = () => {
    const fields: (keyof FormInterface)[] = [
      'client_contact_4_phone1',
      'client_contact_4_phone2',
      'client_contact_6_phone1',
      'client_contact_6_phone2',
      'client_contact_8_phone1',
      'client_contact_8_phone2',
      'client_contact_10_phone1',
      'client_contact_10_phone2',
      'client_contact_12_phone1',
      'client_contact_12_phone2',
    ]

    fields.forEach((field) => {
      const value = getValues(field)
      if (value === undefined) register(field)
    })
  }

  useEffect(() => {
    registerFields()
    load()
  }, [])

  useEffect(() => {
    if (data === null) return
    const formData: FormInterface = {
      // general contact
      phone1: notEmptyStringOrDefault(data.phone1, ''),
      phone2: notEmptyStringOrDefault(data.phone2, ''),
      email: notEmptyStringOrDefault(data.email, ''),

      // master administrator
      administrator_phone: notEmptyStringOrDefault(
        data.administrator_phone,
        '',
      ),

      // financial contact
      client_contact_4_name: '',
      client_contact_4_phone1: '',
      client_contact_4_phone2: '',
      client_contact_4_email: '',

      // complement data - Sponsor
      client_contact_6_name: '',
      client_contact_6_phone1: '',
      client_contact_6_phone2: '',
      client_contact_6_email: '',

      // complement data - Ponto Focal
      client_contact_8_name: '',
      client_contact_8_phone1: '',
      client_contact_8_phone2: '',
      client_contact_8_email: '',

      // complement data - TI
      client_contact_10_name: '',
      client_contact_10_phone1: '',
      client_contact_10_phone2: '',
      client_contact_10_email: '',

      // complement data - Compras
      client_contact_12_name: '',
      client_contact_12_phone1: '',
      client_contact_12_phone2: '',
      client_contact_12_email: '',
    }

    if (Array.isArray(data.client_contacts)) {
      const types = [4, 6, 8, 10, 12]
      data.client_contacts.forEach((value) => {
        const type = value.client_contact_type_id
        if (!types.includes(type)) return

        formData[`client_contact_${type}_name`] = notEmptyStringOrDefault(
          value.name,
          '',
        )
        formData[`client_contact_${type}_phone1`] = notEmptyStringOrDefault(
          value.phone1,
          '',
        )
        formData[`client_contact_${type}_phone2`] = notEmptyStringOrDefault(
          value.phone2,
          '',
        )
        formData[`client_contact_${type}_email`] = notEmptyStringOrDefault(
          value.email,
          '',
        )
      })
    }

    setDefaultValues(formData)
    setValues(formData)

    trigger()
  }, [data])

  const getIntlTelInput = (
    name: keyof FormInterface,
    props: Common = { fluid: true, direction: 'bottom' },
  ): JSX.Element => (
    <IntlTelInput
      name={name}
      watch={watch}
      setValue={setValue}
      control={control as never}
      {...props}
    />
  )

  const onClickCancel = () => {
    setDefaultValues({
      // general contact
      phone1: '',
      phone2: '',
      email: '',

      // master administrator
      administrator_phone: '',

      // financial contact
      client_contact_4_name: '',
      client_contact_4_phone1: '',
      client_contact_4_phone2: '',
      client_contact_4_email: '',

      // complement data - Sponsor
      client_contact_6_name: '',
      client_contact_6_phone1: '',
      client_contact_6_phone2: '',
      client_contact_6_email: '',

      // complement data - Ponto Focal
      client_contact_8_name: '',
      client_contact_8_phone1: '',
      client_contact_8_phone2: '',
      client_contact_8_email: '',

      // complement data - TI
      client_contact_10_name: '',
      client_contact_10_phone1: '',
      client_contact_10_phone2: '',
      client_contact_10_email: '',

      // complement data - Compras
      client_contact_12_name: '',
      client_contact_12_phone1: '',
      client_contact_12_phone2: '',
      client_contact_12_email: '',
    })
    registerFields()
    load()
  }

  return (
    <FormContext.Provider
      value={{
        form,
        getIntlTelInput,
        data,
        loading: [loading, setLoading],
        contractInfo,
        masterAdmin,
        isDirty,
        load,
        onClickCancel,
      }}
      children={props.children}
    />
  )
}

export default useContext
