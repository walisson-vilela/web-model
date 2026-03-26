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

export const activity: {
  [key: string | number]: {
    color: string
    name: string
    value: number
  }
} = {
  Alta: {
    color: '#e23851',
    name: 'Alta',
    value: 1,
  },
  Moderada: {
    color: '#FBCF30',
    name: 'Moderada',
    value: 2,
  },
  Baixa: {
    color: '#4caf50',
    name: 'Baixa',
    value: 3,
  },
}
