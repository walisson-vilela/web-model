export const status: {
  [key: string | number]: {
    color: string
    name: string
  }
} = {
  1: { color: '#66BB6A', name: 'Ativo' },
  0: { color: '#EF5350', name: 'Inativo' },
}

type TLabel = {
  [key: string | number]: {
    color: string
    name: string
  }
}

export const genericStatus: TLabel = {
  1: { color: '#66BB6A', name: 'Sim' },
  0: { color: '#EF5350', name: 'Não' },
}
