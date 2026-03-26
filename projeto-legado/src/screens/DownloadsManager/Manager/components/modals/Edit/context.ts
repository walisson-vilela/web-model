import { createContext } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { Data, Form } from './interfaces'

interface ContextInterface {
  form: UseFormReturn<Form>
  data: Data
}

const FormContext = createContext<ContextInterface>({} as ContextInterface)

export default FormContext
