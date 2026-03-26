export const status: {
  [key: string | number]: {
    color: string
    name: string
  }
} = {
  1: {
    color: '#4caf50',
    name: 'Ativo',
  },
  0: {
    color: '#e23851',
    name: 'Inativo',
  },
}
type KeyValidated = 1 | 0 | ''

export const validated: { [k in KeyValidated]: string } = {
  1: 'Sim',
  0: 'Pend. Gestor',
  '': 'Pend. Executor',
}

type KeyCovered = 0 | 1

export const covered: { [key in KeyCovered]: string } = {
  1: 'Sim',
  0: 'Não',
}
