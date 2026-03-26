import { Tab } from '../../types'

import { Mode } from './interfaces'

export const types: Partial<{
  [key in Tab]: {
    mode: Mode
    title: React.ReactNode
  }
}> = {
  '': {
    mode: 'inbox',
    title: 'Caixa de Entrada',
  },
  sent: {
    mode: 'sent',
    title: 'Enviados',
  },
  important: {
    mode: 'is_important',
    title: 'Importantes',
  },
}
