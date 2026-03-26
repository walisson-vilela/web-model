export interface FavoriteFormProps {
  id?: number
  close: () => void
  reload: () => void
}

export interface FormData {
  name: string
  description: string
}
