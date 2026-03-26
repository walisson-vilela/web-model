import type { ReactNode } from '../../interfaces'

export interface AppliedFilter {
  /** nome da chave do filtro */
  name: string
  /** labels do filtro */
  labels: {
    /** label do filtro */
    filter: {
      text: string
      element: ReactNode
    }
    /** label da opcao escolhida */
    option: {
      text: string
      element: ReactNode
    }
  }
  /** valor da opcao escolhida */
  value: string | number | boolean
}
