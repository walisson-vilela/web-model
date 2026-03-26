export interface StoreData {
  people_id?: number
  people_name?: string
  store_id?: number
  store_name?: string
  formatted_address?: string
  checked?: boolean
  justify_name?: string
}

interface FiltersProps {
  type?: string
  people_id?: number
  date?: string
  justify?: number
}

export interface StoresListProps {
  title: string | JSX.Element | (string | JSX.Element)[]
  subtitle: string | JSX.Element | (string | JSX.Element)[]
  filters: FiltersProps
}
