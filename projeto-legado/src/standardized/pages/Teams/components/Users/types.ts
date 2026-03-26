export type UserQueue = {
  created: string
  priority: number
  user: {
    id: number
    region_count: number
    person: {
      id: number
      registration: string | null
    }
    avatar: {
      url: string
      name: string
    } | null
    role: {
      id: number
      name: string
    }
    name: string
  }
}
