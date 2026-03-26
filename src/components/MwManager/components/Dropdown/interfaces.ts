export interface Rule {
  /** funcao que fara a validacao da regra, deve retornar true caso passe na validacao, e false caso contrario */
  rule: () => boolean
  /** string de mensagem que sera exibida caso a validacao falhe */
  message: JSX.Element | string
}

export interface Item {
  /** conteudo do botao que aparecera no menu */
  content: JSX.Element | string
  /** tom visual do item */
  tone?: 'default' | 'danger'
  /** indica se o botao deve ter um delimitador a cima ou nao */
  border?: boolean
  /** acao que sera executada ao clicar no botao */
  onClick: React.MouseEventHandler<HTMLButtonElement>
  /** indica se o dropdown deve fechar após clicar no botao */
  closeOnClick?: boolean
  /** lista de regras para habilitar o botao, a primeira regra que falhar ira desabilitar o botao */
  rules: Rule[]
}

export type Position =
  | 'top left'
  | 'top right'
  | 'left top'
  | 'left bottom'
  | 'bottom left'
  | 'bottom right'
  | 'right top'
  | 'right bottom'

interface Common {
  /** lista de botoes que serao exibidos no dropdown */
  items: Item[]
}

export interface DropdownProps extends Common {
  /** indicador de loading ativo */
  loading: boolean
  /** eixo que o dropdown deve abrir */
  axis: 'x' | 'y'
  centerCoodinates?: {
    x?: number
    y?: number
  }
  occult?: boolean
  children?: string | JSX.Element | (string | JSX.Element)[]
  disabled?:
    | boolean
    | {
        content: string | JSX.Element
        inverted?: boolean
        position?:
          | 'top left'
          | 'top right'
          | 'bottom left'
          | 'bottom right'
          | 'right center'
          | 'left center'
          | 'top center'
          | 'bottom center'
      }
  notAbsolute?: true
}

export interface DropdownContextInterface extends Common {
  /** indicador de dropdown aberto */
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  position: Position
}
