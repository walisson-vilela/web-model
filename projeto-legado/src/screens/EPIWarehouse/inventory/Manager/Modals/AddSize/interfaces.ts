import { UseFormReturn } from 'react-hook-form'

import { useEndpointValidation } from '../../../../../../utils/hooks'
import { BodyInterface } from '../../interfaces'

export interface Form {
  name: string
  status: string
  reason: string
  size_type: string
  sizes: string[]
}

export interface CreateProps {
  data?: BodyInterface
  reload: () => void
  close: () => void
}

interface EpiItem {
  id?: number
  epi_type_id?: number
  size: string
  status: boolean
}

export interface UpdateEPIPayload {
  id: number
  size_type: string
  epis: EpiItem[]
}

export type Context = Pick<CreateProps, 'data' > & {
  form: UseFormReturn<Form>

  nameCheck: ReturnType<typeof useEndpointValidation>
}
