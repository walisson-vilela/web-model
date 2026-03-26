import { ColorOptions } from '@mw-kit/mw-ui/dist/theme/interfaces'

export const status: Record<
  string,
  {
    color: ColorOptions | string
    name: string
  }
> = {
  active: { color: 'lightGreen', name: 'Ativo' },
}

export const systemActivity: Record<
  string,
  {
    color: string
    name: string
  }
> = {
  low: { color: '#4caf50', name: 'Baixa' },
  moderate: { color: '#FBCF30', name: 'Moderada' },
  high: { color: '#e23851', name: 'Alta' },
  none: { color: '#d1d5db', name: '' },
}
