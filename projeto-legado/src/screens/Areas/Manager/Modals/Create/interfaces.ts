import { UseFormReturn } from 'react-hook-form'

import { useEndpointValidation } from '../../../../../utils/hooks'
import { BodyInterface } from '../../interfaces'

export interface Form {
  name: string
  country_id: number | ''
}

export interface CreateProps {
  data?: BodyInterface
  hierarchy_id: number
  reload: () => void
  close: () => void
}

export type Context = Pick<CreateProps, 'data' | 'hierarchy_id'> & {
  form: UseFormReturn<Form>
  nameCheck: ReturnType<typeof useEndpointValidation>
}
