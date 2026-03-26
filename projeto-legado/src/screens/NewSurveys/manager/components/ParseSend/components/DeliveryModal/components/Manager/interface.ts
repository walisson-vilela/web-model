export interface DataInterface {
  id: number
  People: {
    id: number
    name: string
  }
  Role: {
    id: number
    name: string
  }
  formatted_created_at: string
  formatted_modified_at: string
  formatted_mobile_date: string
}

export interface BodyInterface {
  id: number
  user: string
  role: string
  timeSend: string
  timeRecive: string
  timeConection: string
}
