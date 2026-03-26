import type { CardStatusConfig } from './types'

export const CURRENT_YEAR = new Date().getFullYear()
export const CURRENT_MONTH = new Date().getMonth()

export const CARD_STATUS: CardStatusConfig = {
  CONCLUDED: {
    label: 'Concluido',
    value: 'C',
    indicatorType: 'success',
    dateColor: 'lightGreen',
  },
  INACTIVATED: {
    label: 'Inativado',
    value: 'IN',
    indicatorType: 'danger',
    dateColor: 'warningRed',
  },
  INTERRUPTED: {
    label: 'Interrompido',
    value: 'I',
    indicatorType: 'danger',
    dateColor: 'warningRed',
  },
  ACTIVE: {
    label: 'Sem Status',
    value: 'S',
    indicatorType: 'info',
  },
} as const

export const CALENDAR_EVENT_TYPES = {
  MEETING: 'Reunião',
  CONVETION: 'Convenção',
  COACHING: 'Treinamento',
} as const
