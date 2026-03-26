import { createContext, useContext } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { BodyInterface } from '../../interfaces'

import { StatusProcess, formType } from './interfaces'

interface Context {
  editData: BodyInterface
  validName: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  form: UseFormReturn<formType>
  isInvalid: (field: keyof formType) => boolean
  statusProcess: [
    StatusProcess,
    React.Dispatch<React.SetStateAction<StatusProcess>>,
  ]
}

const CategoriesContext = createContext<Context>({} as Context)

export const useCategoriesContext = () => useContext(CategoriesContext)

export default CategoriesContext
