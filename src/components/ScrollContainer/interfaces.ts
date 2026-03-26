import type React from 'react'

import type {
  ReactNode,
  SpacingOrZero,
  Spacings,
  ThemeInterface,
} from '../../interfaces'
import type { LoaderProps } from '../Loader/interfaces'

type Common = React.HTMLAttributes<HTMLDivElement> & {
  height?: string
  maxHeight?: string
  spacing?: SpacingOrZero | Omit<Spacings, 'right'>
}

export type OverflowContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  $height?: Common['height']
  $maxHeight?: Common['maxHeight']
  $spacing?: Common['spacing']
}

export type AfterBefore = React.HTMLAttributes<HTMLDivElement> & {
  fluid?: true
  background?:
    | Parameters<ThemeInterface['getColor']>
    | Parameters<ThemeInterface['getColor']>[0]
  spacing?: SpacingOrZero | Omit<Spacings, 'right'>
  children: ReactNode
}

export type StyledAfterBefore = {
  $fluid?: AfterBefore['fluid']
  $background?: AfterBefore['background']
  $spacing?: AfterBefore['spacing']
}

export interface ScrollContainerProps extends Common {
  onScrollEnd?: (
    event: React.UIEvent<HTMLDivElement, UIEvent>,
  ) => void | Promise<void>
  before?: ReactNode | AfterBefore
  after?: ReactNode | AfterBefore
  empty?: {
    empty: boolean
    content: ReactNode
  }
  loading?: boolean | LoaderProps
}
