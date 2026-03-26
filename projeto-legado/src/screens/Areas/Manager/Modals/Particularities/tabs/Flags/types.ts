import { BodyInterface as CommonBodyInterface } from '../../types'

export type BodyInterface = CommonBodyInterface & {
  network_name: string | null
  group_name: string | null
}
