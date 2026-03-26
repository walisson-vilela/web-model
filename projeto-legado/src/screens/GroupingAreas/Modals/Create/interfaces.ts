import { UseFormReturn } from 'react-hook-form'

import { useEndpointValidation } from '../../../../utils/hooks'
import { BodyInterface } from '../../tabs/interfaces'

export interface CreateProps {
  close: () => void
  reload: () => void
  data?: BodyInterface
  hierarchy_id: number
}

export interface Form {
  name: string
  country_id: number | ''
}

export type Context = Pick<CreateProps, 'data' | 'hierarchy_id'> & {
  form: UseFormReturn<Form>
  nameCheck: ReturnType<typeof useEndpointValidation>
}
