export const status: {
  [key: string | number]: {
    color: string
    name: string
  }
} = {
  Ativo: {
    color: '#4CAF50',
    name: 'Ativo',
  },
  'Inativo (Temporário)': {
    color: '#FBCF30',
    name: 'Inativo (Temporário)',
  },
  'Inativo (Definitivo)': {
    color: '#E23851',
    name: 'Inativo (Definitivo)',
  },
}
