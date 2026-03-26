import { createContext, useContext } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { EventDates, FormInterface } from './interfaces'

interface ContextForm extends UseFormReturn<FormInterface> {
  isInvalid: <Name extends keyof FormInterface>(field: Name) => boolean
  isRequired: <Name extends keyof FormInterface>(field: Name) => boolean
}

type ReactState<T> = [T, React.Dispatch<React.SetStateAction<T>>]

interface ContextInterface {
  form: ContextForm
  user_id: number
  eventDates: ReactState<EventDates>
}

export const FormContext = createContext<ContextInterface>(
  {} as ContextInterface,
)

const useFormContext = () => useContext(FormContext)

export default useFormContext
