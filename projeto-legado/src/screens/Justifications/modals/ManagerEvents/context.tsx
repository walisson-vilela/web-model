import React, { ReactNode, createContext, useEffect, useState } from 'react'

import { OptionsProps } from './interface'

interface ManagerEventProps {
  checked: OptionsProps
  setChecked: React.Dispatch<React.SetStateAction<OptionsProps>>
  formMotivation: {
    label: string
  }
  setFormMotivation: React.Dispatch<
    React.SetStateAction<{
      label: string
    }>
  >
  formDateInterval: [string, string]
  setFormDateInterval: React.Dispatch<React.SetStateAction<[string, string]>>

  formDate: string
  setFormDate: React.Dispatch<React.SetStateAction<string>>
  file: File
  setFile: React.Dispatch<React.SetStateAction<File | null>>
  disabled: boolean
}

export const ManagerEventContext = createContext({} as ManagerEventProps)

interface ManagerEventProviderProps {
  children: ReactNode
}

export const ManagerEventProvider = ({
  children,
}: ManagerEventProviderProps) => {
  const [checked, setChecked] = useState<OptionsProps>({
    id: 1,
    label: 'Temporário',
  })
  const [formMotivation, setFormMotivation] = useState({ label: '' })
  const [formDateInterval, setFormDateInterval] = useState<[string, string]>([
    '',
    '',
  ])
  const [formDate, setFormDate] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)

  const disabled =
    checked.id === 0 ||
    formMotivation.label === '' ||
    (formDateInterval[0] === '' && formDate === '')

  useEffect(() => {
    setFormMotivation({ label: '' })
    setFormDateInterval(['', ''])
  }, [checked])
  return (
    <ManagerEventContext.Provider
      value={{
        checked,
        setChecked,
        disabled,
        file,
        setFile,
        formDate,
        setFormDate,
        formDateInterval,
        setFormDateInterval,
        formMotivation,
        setFormMotivation,
      }}
    >
      {children}
    </ManagerEventContext.Provider>
  )
}
