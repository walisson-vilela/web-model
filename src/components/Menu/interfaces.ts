import type React from 'react'

import type {
  Borders,
  GenericObject,
  ReactNode,
  SpacingOrZero,
  Spacings,
} from '../../interfaces'
import type { AbsoluteContainerProps } from '../AbsoluteContainer/interfaces'
import type { PopupPlacement } from '../Popup/types'
import type { ScrollContainerProps } from '../ScrollContainer/interfaces'

/** funcao que fara a validacao da regra, deve retornar true caso passe na validacao, e false ou o conteudo do popup caso contrario */
type Rule<T extends GenericObject = GenericObject> = (
  index: number,
  data: T,
) => boolean | RulePopupProps

export type RulePopupProps = {
  content: ReactNode
  placement?: PopupPlacement
  background?: 'light' | 'dark'
  arrow?: 'flattened' | 'pointed' | 'none'
  zIndex?: number
}

export type MenuOptionLabelProps<T extends GenericObject = GenericObject> = {
  delimiter?: boolean
  keepOpen?: boolean
  caret?: boolean
  disabled?: boolean
  border?: Borders
  data: T
}

export type OptionLabelComponent<T extends GenericObject = GenericObject> =
  React.FunctionComponent<MenuOptionLabelProps<T>>

export type Option<T extends GenericObject = GenericObject> =
  MenuOptionLabelProps<T> & {
    label: ReactNode | OptionLabelComponent<T>
    onClick?: (index: number, option: Option, event: React.MouseEvent) => void
    rules?: Rule<T>[]
  }

export interface CommonProps
  extends Omit<AbsoluteContainerProps, 'children' | 'content'> {
  bordered?: boolean
  containerSpacing?: SpacingOrZero | Omit<Spacings, 'right'>
  itemSpacing?: SpacingOrZero | Spacings
  children?: JSX.Element | (string & (string | JSX.Element | undefined)) | null
}

export interface MenuProps<T extends GenericObject = GenericObject>
  extends CommonProps,
    Pick<ScrollContainerProps, 'onScrollEnd' | 'loading' | 'before' | 'after'> {
  close: () => void
  options: Option<T>[]
  scrollSpacing?: ScrollContainerProps['spacing']
  scrollTabIndex?: number
  emptyContent?: ReactNode
  highlight?: number
}

export type ContainerProps = CommonProps & {
  $highlight?: number
}

export type StyledContainerProps = {
  $containerSpacing?: CommonProps['containerSpacing']
  $bordered?: CommonProps['bordered']
  $itemSpacing?: CommonProps['itemSpacing']
}

export type MenuInterface = <T extends GenericObject = GenericObject>(
  props: MenuProps<T>,
  ref?: React.ForwardedRef<HTMLDivElement>,
) => JSX.Element

export interface StyledOptionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  $disabled?: boolean
  $border?: Borders
  $highlighted?: boolean
}
