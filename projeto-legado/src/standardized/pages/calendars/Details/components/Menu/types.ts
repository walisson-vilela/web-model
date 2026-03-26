import { MenuProps as MwMenuProps } from '@mw-kit/mw-ui/dist/components/Menu/interfaces'

export type MenuProps = Pick<
  MwMenuProps,
  'maxHeight' | 'width' | 'options' | 'children'
>
