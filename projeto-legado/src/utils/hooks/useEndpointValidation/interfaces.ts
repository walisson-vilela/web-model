import { Path, UseFormReturn } from 'react-hook-form'

export interface EndpointResponse {
  success: boolean
}

export interface Response {
  isValid: boolean
  loading: boolean
  trigger: () => void
  message?: string
}

interface CommonOptions {
  key?: string
  endpoint: string
  delay?: number
  baseURL?: string
  exceptID?: number | string
  minLength?: number
  messages?: {
    valid?: string
    invalid?: string
    notVerified?: string
  }
  properties?: PropertiesOptions
}

interface PropertiesOptions {
  [key: string]: any
}

interface ValidateState extends CommonOptions {
  stateValue: string
  formKey?: never
  formInstance?: never
}

interface ValidateForm<Form> extends CommonOptions {
  stateValue?: never
  formKey: Path<Form>
  formInstance: UseFormReturn<Form>
}

export type EndpointValidationOptions<Form> = ValidateState | ValidateForm<Form>
