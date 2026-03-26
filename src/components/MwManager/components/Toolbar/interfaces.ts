export interface AppliedFilter {
  /** nome da chave do filtro */
  name: string
  /** labels do filtro */
  labels: {
    /** label do filtro */
    filter: string
    /** label da opcao escolhida */
    option: JSX.Element | string
  }
  /** valor da opcao escolhida */
  value: string | number | boolean
}

export interface Option {
  /** label da opcao */
  label: JSX.Element | string
  /** valor da opcao */
  value: string | number | boolean
  /** se o label tem espacamento pequeno */
  thin?: boolean
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
  label: string
  /** nome da chave do filtro */
  name: string
  /** lista de opcoes ou funcao que retorna a lista de opcoes */
  options: Option[] | OptionsCallback
  /** se o filtro for do tipo callback, podera ser enviado este parametro para indicar se o filtro permite busca com string vazia */
  allowEmptyString?: boolean
  /** indicador de filtro desabilitado */
  disabled?: boolean
  /** indicador de barra divisoria */
  delimiter?: boolean
}
