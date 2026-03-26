import { MwIcon } from '@mw-kit/mw-ui'
import { ThemeInterface } from '@mw-kit/mw-ui/types'

import { isObject } from '../../utils/validators'

export const PERSON_STATUS: {
  [K in 'A' | 'PC' | 'T' | 'AP' | 'P']: {
    color: keyof ThemeInterface['colors']
    label: string
    value: K
  }
} = {
  A: { color: 'lightGreen', label: 'Ativo', value: 'A' },
  PC: { color: 'warningYellow', label: 'Pendencia Cadastral', value: 'PC' },
  T: { color: 'purple', label: 'Inativo Temporário', value: 'T' },
  AP: { color: 'blue', label: 'Ativação Programada', value: 'AP' },
  P: { color: 'red', label: 'Inativo', value: 'P' },
}

export const getStatus = (user: unknown): keyof typeof PERSON_STATUS => {
  if (!isObject(user)) return 'PC'

  if (user.deleted_at) return 'P'

  if (user.active) return 'A'

  return user.event?.type !== 'ACTIVATION' ? 'T' : 'AP'
}

export const TRAVEL_MODE: {
  [K in 'CAR' | 'MOTORCICLE' | 'PUBLIC']: {
    label: string
    value: K
    icon: Parameters<typeof MwIcon>[0]
  }
} = {
  CAR: {
    label: 'Carro',
    value: 'CAR',
    icon: {
      type: 'semantic',
      icon: 'car',
    },
  },
  MOTORCICLE: {
    label: 'Moto',
    value: 'MOTORCICLE',
    icon: {
      type: 'semantic',
      icon: 'motorcycle',
    },
  },
  PUBLIC: {
    label: 'Transporte Público',
    value: 'PUBLIC',
    icon: {
      type: 'semantic',
      icon: 'bus',
    },
  },
}
