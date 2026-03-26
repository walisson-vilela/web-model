import { UseFormReturn } from 'react-hook-form'

import { BodyInterface } from '../../interfaces'

export interface Form {
  name: string
  status: string
  size_type: string
  sizes: string[]
  reason: number | string
  reasonReturned: number | string
  quantity_decrease: number
  quantity_increase: number
}

export interface OptionsProps {
  value: string
  label: string
  size?: string
  size_type?: string
  epi_type_id?: number
  inventory_count?: number
  status?: boolean
}

export interface CreateProps {
  data?: BodyInterface
  reload: () => void
  close: () => void
}

export type Context = Pick<CreateProps, 'data'> & {
  form: UseFormReturn<Form>
  options: OptionsProps[]
}
