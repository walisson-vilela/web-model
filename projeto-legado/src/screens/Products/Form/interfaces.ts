import { Modifier } from '../../../standardized/components/form/components/Footer'

interface IFile {
  id: number
  url: string
  name: string
  size: number
}

export interface Form {
  /** status */
  status: boolean

  /** tipo */
  type: 'OWN' | 'COMPETITOR'
  /** codigo */
  code: string
  /** nome */
  name: string
  /** categoria e subnível */
  product_line_id: number | null
  /** marca */
  brand_id: number | null

  /** EAN 13 */
  ean_13: string
  /** classificacao */
  classification_id: number | null
  /** notificar registros de preço */
  notify_price: boolean | null
  /** preço mínimo */
  price_min: number | null
  /** preço máximo */
  price_max: number | null
  /** unidade de medida */
  measurement_unit: 'KG' | 'LITRO' | 'UNID' | 'PACOTE' | null
  /** medida */
  measurement: number | null

  /** orientações gerais */
  description: string

  /** Galeria de Imagens */
  files: (IFile | File)[]
}

export interface Data {
  id: number
  modifier: Modifier | null
}
interface Person {
  id: number
  name: string
}
