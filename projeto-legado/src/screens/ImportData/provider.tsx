import { createContext, useContext, useState } from 'react'

import moment from 'moment'

import { RouteTabProvider } from '../../routes/types'
import { EmptyManagerProps, ManagerProps } from '../interfaces'

import { FormStateInterface } from './interfaces'

interface Persist {
  managerProps: ManagerProps
  reloadTrigger: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  form: [
    FormStateInterface,
    React.Dispatch<React.SetStateAction<FormStateInterface>>,
  ]
}

const Context = createContext<Persist>({
  managerProps: EmptyManagerProps,
  form: [
    {
      type: 'G',
      file: null,
      settings: {},
      email: '',
      dateTime: moment().add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
    },
    () => {},
  ],

  reloadTrigger: [false, () => {}],
})

export const ImportDataProvider: RouteTabProvider = (props) => {
  const [reloadTrigger, setReloadTrigger] = useState<boolean>(false)
  const [form, setForm] = useState<FormStateInterface>({
    type: 'G',
    file: null,
    settings: null,
    email: '',
    dateTime: moment().add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
  })
  const value: Persist = {
    managerProps: EmptyManagerProps,
    form: [form, setForm],
    reloadTrigger: [reloadTrigger, setReloadTrigger],
  }
  return <Context.Provider value={value} children={props.children} />
}

const useImportDataContext = () => useContext(Context)

export default useImportDataContext
