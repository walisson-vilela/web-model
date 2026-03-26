export const status: {
  [key: string]: { color: string; name: string }
} = {
  A: { color: '#66BB6A', name: 'Ativo' },
  I: { color: '#EF5350', name: 'Inativo' },
}

export const types: {
  [K in 1 | 0]: {
    value: K
    label: string
  }
} = {
  1: {
    label: 'Padrão',
    value: 1,
  },
  0: {
    label: 'Personalizado',
    value: 0,
  },
}
