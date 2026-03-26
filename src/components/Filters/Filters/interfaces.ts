import type React from 'react'

import type { ReactNode, SpacingOrZero } from '../../../interfaces'
import type { AbsoluteContainerProps } from '../../AbsoluteContainer/interfaces'
import type { ButtonProps } from '../Button/interfaces'
import type { AppliedFilter } from '../interfaces'

export interface Label {
  text: string
  element: ReactNode
}

type LabelOrString = string | Label

export interface Option {
  /** label da opcao */
  label: LabelOrString

  /** valor da opcao */
  value: string | number | boolean
}

export interface OptionsReturn {
  options: Option[]
  lastPage: boolean
}

/**
 * essa callback recebe o valor da string de busca e opcionalmente o indice da pagina, e ela deve retornar uma lista de opcoes
 * para que a paginacao seja considerada, e necessario retornar a lista de opcoes em um objeto, juntamente com o indicador de ultima pagina
 * */
export type OptionsCallback = (
  value: string,
  page?: number,
) => Promise<OptionsReturn | Option[]>

export interface Filter {
  /** label do filtro */
  label: LabelOrString
  /** nome da chave do filtro */
  name: string
  /** lista de opcoes ou funcao que retorna a lista de opcoes */
  options: Option[] | OptionsCallback
  /** se o filtro for do tipo callback, podera ser enviado este parametro para indicar se o filtro permite busca com string vazia */
  allowEmptySearch?: boolean
  /** indicador de filtro desabilitado */
  disabled?: boolean
  /** indicador de barra divisoria */
  delimiter?: boolean
  /** espacamento das opcoes deste filtro, default s1 */
  optionSpacing?: SpacingOrZero
  /** mantem o menu de filtros abertos após a selecao */
  keepOpen?: true
}

export interface Common {
  items: Filter[]
  setAppliedFilters: React.Dispatch<React.SetStateAction<AppliedFilter[]>>
  containerProps?: Omit<AbsoluteContainerProps, 'open'>
  subContainerProps?: Pick<AbsoluteContainerProps, 'center'>
}

export type FiltersProps = Common & Omit<ButtonProps, 'getContent' | 'gap'>
