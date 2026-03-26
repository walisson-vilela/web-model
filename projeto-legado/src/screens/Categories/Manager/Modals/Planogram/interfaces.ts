import { BodyInterface } from '../../interfaces'

export interface PlanogramProps {
  setOpen: Function
  planogramData: BodyInterface
  loadData: Function
}

export interface PlanogramRegistries {
  id?: number
  image?: File
  base64: string
  subject: string
  description: string
}
