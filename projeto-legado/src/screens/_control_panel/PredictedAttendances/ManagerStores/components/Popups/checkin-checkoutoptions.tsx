import React from 'react'

import {
  CheckAuto,
  CheckFoto,
  CheckGps,
  CheckNotificacao,
  CheckWeb,
} from '../../icons/index'

import { Laptop } from './Laptop'
import { Speaker } from './Speaker'
import { Timer } from './Timer'

export const types: {
  [key: number]: {
    icon: () => JSX.Element
    handler?: (
      params?: any,
      checkType?: 'check-in' | 'check-out',
    ) => Promise<JSX.Element>
  }
} = {
  0: {
    icon: () => <CheckGps />,
  },

  1: {
    icon: () => <CheckFoto />,
  },

  2: {
    icon: () => <CheckWeb />,
    handler: async (params?: any, checkType?: 'check-in' | 'check-out') => (
      <Laptop params={params} checkType={checkType} />
    ),
  },

  3: {
    icon: () => <CheckNotificacao />,
    handler: async (params?: any, checkType?: 'check-in' | 'check-out') => (
      <Speaker params={params} checkType={checkType} />
    ),
  },

  4: {
    icon: () => <CheckAuto />,
    handler: async (params?: any, checkType?: 'check-in' | 'check-out') => (
      <Timer params={params} checkType={checkType} />
    ),
  },
}
