export interface BrandListProps {
  id: number
  name: string
  file?: {
    hash: string
    id: number
    url: string
  } | null
}
