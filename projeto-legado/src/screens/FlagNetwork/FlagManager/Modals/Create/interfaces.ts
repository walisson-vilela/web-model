import { UseFormReturn } from 'react-hook-form'

import { useEndpointValidation } from '../../../../../utils/hooks'

export interface formType {
  id?: number | null
  parent_id?: string | number | null
  grandparent_id?: string | number | null
  name?: string | null
  active?: boolean | null
  level?: 3 | null
  avatar?: any
}

interface editDataProps extends formType {
  parent_name?: string | null
  grandparent_name?: string | null
}

export interface CreateProps {
  setOpen: Function
  editData?: editDataProps
  loadData: Function
}

export type Context = CreateProps &
  editDataProps & {
    form: UseFormReturn<formType>
    nameCheck: ReturnType<typeof useEndpointValidation>
    file: [string, React.Dispatch<React.SetStateAction<string>>]
    fileUploaded: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    isInvalid: (field: keyof formType) => boolean
  }
