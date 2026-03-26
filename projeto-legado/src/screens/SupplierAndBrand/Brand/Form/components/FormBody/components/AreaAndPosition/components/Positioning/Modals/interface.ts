export type { Rule } from '../../../../../../../../../../../components/GridSelector/interfaces'

export type Common = {
  id?: number
  foreign_id: number
  name: string
}

export type Segments = Common

export type Flags = Common & {
  chain: string
  group: string
}
