export interface Card {
  title: string
  color: string // hexadecimal color
  validity: {
    start: string // date
    end: string // date
    duration: number // days
    type: 'Iniciada' | 'Não Iniciada' | 'Encerrada' | string // iniciada, nao iniciada, encerrada
  }
  chart: {
    range: (string | number)[]
    data: {
      label: string
      value: number
      color: string // hexadecimal color
    }[]
    percentage: {
      label: string
      value: number
    }
  }
  required: boolean
  behavior: string
  form_count: number
  active: boolean
  frequency:
    | 'Diária'
    | 'Semanal'
    | 'Quinzenal'
    | 'Mensal'
    | 'Única Vez'
    | 'Repetição'
    | string
  weekdays: {
    sun: boolean
    mon: boolean
    tue: boolean
    wed: boolean
    thu: boolean
    fry: boolean
    sat: boolean
  } | null
  impact: {
    stores: number
    regions: number
    users: number
    categories: number
    skus: number
  }
}

export interface DataInterface {
  title: string
  cards: Card[]
}
