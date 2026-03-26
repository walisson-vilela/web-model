import { UseFormReturn } from 'react-hook-form'

import { useEndpointValidation } from '../../../../../utils/hooks'

export interface formType {
  id?: number | null
  parent_id?: string | number | null
  name?: string | null
  active?: boolean | null
  level?: 2 | null
}

interface editDataProps extends formType {
  parent_name?: string | null
}

export interface CreateProps {
  setOpen: Function
  editData?: editDataProps
  loadData: Function
}

export type Context = CreateProps & {
  form: UseFormReturn<formType>
  nameCheck: ReturnType<typeof useEndpointValidation>
  isInvalid: (field: keyof formType) => boolean
}
