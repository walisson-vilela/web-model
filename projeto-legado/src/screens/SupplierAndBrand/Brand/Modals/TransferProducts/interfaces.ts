import { BodyInterface } from '../../Manager/interface'

export type Product = {
  id: number
  name: string | null
  category_name: string | null
  product_line_name: string | null
}

export type Brand = {
  id: number
  name: string | null
}

export interface UserTransferContext {
  left: [Product[], React.Dispatch<React.SetStateAction<Product[]>>]
  right: [Brand | null, React.Dispatch<React.SetStateAction<Brand | null>>]
  data: BodyInterface
}

export interface TransferProductsProps {
  close: () => void
  reload: () => void
  data: BodyInterface
}
