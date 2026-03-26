export const statusLabels: {
  [key: string | number]: {
    color: string
    name: string
    value: string
  }
} = {
  Concluído: {
    color: '#66BB6A',
    name: 'Concluido',
    value: 'Concluido',
  },

  'Em Andamento': {
    color: '#FBCF30',
    name: 'Em Andamento',
    value: 'Em Andamento',
  },

  'Não Realizado': {
    color: '#E23851',
    name: 'Não Realizado',
    value: 'Não Realizado',
  },

  Previsto: {
    color: '#3455AB',
    name: 'Previsto',
    value: 'Previsto',
  },
  Justificado: {
    color: '#E23851',
    name: 'Justificado',
    value: 'Justificado',
  },
  Recusado: {
    color: '#E23851',
    name: 'Recusado',
    value: 'Recusado',
  },
}

export const attendanceOrigin: {
  [key: string | number]: string
} = {
  Rota: 'Rota',
  Carteira: 'Carteira',
  'Carteira Foco': 'Carteira Foco',
}
