import { UseFormReturn } from 'react-hook-form'

import { useEndpointValidation } from '../../../../../../utils/hooks'

export interface Form {
  name: string
  status: boolean | number
  size_type: string
  sizes: string[]
}

export interface CreateProps {
  close: () => void
  data: any
  reload: () => void
}

export type Context = Pick<CreateProps, 'data' > & {
  form: UseFormReturn<Form>

  nameCheck: ReturnType<typeof useEndpointValidation>
}
