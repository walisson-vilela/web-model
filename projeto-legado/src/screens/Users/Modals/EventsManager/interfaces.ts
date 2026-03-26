export interface Props {
  user_id: number
  name: string
  close: () => void
  reload: () => void
}

export type Event = {
  type: 'in' | 'out'
  interrupted_at: Date | null
  created_at: Date | null
  modified_at: Date | null
  event: {
    id: number
    name: string
    type_label: string
    starts_at: Date
    ends_at: Date | null
    ended_at: Date | null
    origin: string
    classification: {
      id: number
      name: string
    } | null
    file: {
      url: string
      name: string
    } | null
  }
  creator: { name: string } | null
  modifier: { name: string } | null
}
