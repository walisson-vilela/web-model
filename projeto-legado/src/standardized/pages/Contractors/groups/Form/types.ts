import { Modifier } from '../../../../components/form/components/Footer'
import { AssociatedUser } from '../../components/ResponsibleTeam/types'

export interface AssociatedGroup {
  id?: number
  subcontractor_id: number
  name: string
  type_text: string | null
  avatar: { url: string } | null
}

export interface Data {
  id: number | null
  active: number
  type: string
  name: string | null
  allocated_users: number

  contractors_subcontractors: AssociatedGroup[]
  contractor_peoples: AssociatedUser[]

  modifier: Modifier | null
}
export interface Form {
  // status
  active: number
  type: string

  // basic data
  name: string

  allocated_users: number

  group_associated: AssociatedGroup[]
  associated_users: AssociatedUser[]
}
