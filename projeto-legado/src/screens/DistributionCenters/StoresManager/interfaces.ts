export interface Store {
  id: number | null
  name: string | null
  formatted_address: string | null
  added: boolean
  disabled: boolean
  checkIcon: boolean
  message?: string | JSX.Element
}
