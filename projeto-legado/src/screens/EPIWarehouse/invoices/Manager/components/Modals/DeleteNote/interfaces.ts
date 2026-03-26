import { UseFormReturn } from 'react-hook-form'

import { useEndpointValidation } from '../../../../../../../utils/hooks'
import { BodyInterface } from '../../../interfaces'

export interface Form {
  name: string
  status: string
  size_type: string
  sizes: string[]
}

export interface CreateProps {
  data?: BodyInterface
  reload: () => void
  close: () => void
}

export type Context = Pick<CreateProps, 'data' > & {
  form: UseFormReturn<Form>

  nameCheck: ReturnType<typeof useEndpointValidation>
}
