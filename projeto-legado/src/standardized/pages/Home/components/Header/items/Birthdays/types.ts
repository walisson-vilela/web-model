export type Person = {
  id: number
  name: string
  birthday: string
  role: {
    id: number
    name: string
  } | null
  avatar: string
}

export type Pagination = {
  page: number
  last: boolean
  total: number
}
