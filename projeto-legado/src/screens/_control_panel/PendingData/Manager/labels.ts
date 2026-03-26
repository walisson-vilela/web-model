export const status: {
  [key: string | number]: {
    color: string
    name: string
    value: number
  }
} = {
  Ativo: {
    color: '#4caf50',
    name: 'Ativo',
    value: 1,
  },
  Inativo: {
    color: '#e23851',
    name: 'Inativo',
    value: 0,
  },
}

export const connectionLevel: {
  [key: string | number]: {
    color: string
    name: string
    value: string
  }
} = {
  1: {
    color: '#e23851',
    name: 'Ruim',
    value: 'Ruim',
  },
  2: {
    color: '#FBCF30',
    name: 'Moderada',
    value: 'Moderada',
  },
  3: {
    color: '#4caf50',
    name: 'Boa',
    value: 'Boa',
  },
}
