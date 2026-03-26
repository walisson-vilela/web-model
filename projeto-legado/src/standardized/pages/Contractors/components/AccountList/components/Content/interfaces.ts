export interface Row {
  id: number | null
  name: string | null
  avatar: {
    id: number
    url: string
    name: string
  } | null
}
