import { UseFormReturn } from 'react-hook-form'

import { useEndpointValidation } from '../../../../../../utils/hooks'
import { BodyInterface } from '../../interfaces'

export interface Form {
  inventory_decrease: number
  reason: string
  obs: string
  epi_fiscal_note_id: number
  epi_id: number
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
