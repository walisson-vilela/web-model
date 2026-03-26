import type { ReactNode } from '../../../../../../../interfaces'

export interface HeaderProps {
  search: [string, (value: string) => void]
  title:
    | string
    | {
        text: string
        element: ReactNode
      }
  /** se o filtro for do tipo callback, podera ser enviado este parametro para indicar se o filtro permite busca com string vazia */
  allowEmptySearch?: boolean
  withSearch: boolean
}
