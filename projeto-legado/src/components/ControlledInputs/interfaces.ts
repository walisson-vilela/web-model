import { UseFormReturn } from 'react-hook-form'

export interface Common {
  name: string
  form: UseFormReturn<any>
  shouldTrigger?: boolean
}
