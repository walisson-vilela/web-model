import { ColorOptions } from '@mw-kit/mw-ui/dist/theme/interfaces'

export const status: Record<
  string,
  {
    color: ColorOptions | string
    name: string
  }
> = {
  active: { color: 'lightGreen', name: 'Ativo' },
  temporary_inactive: { color: '#E23851', name: 'Inativo Temporário' },
}
