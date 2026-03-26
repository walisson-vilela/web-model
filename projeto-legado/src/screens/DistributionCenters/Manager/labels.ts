export const status: {
  [key: string | number]: {
    color: string
    name: string
    value: number
  }
} = {
  true: {
    color: '#4caf50',
    name: 'Ativo',
    value: 1,
  },
  false: {
    color: '#e23851',
    name: 'Inativo',
    value: 0,
  },
}
