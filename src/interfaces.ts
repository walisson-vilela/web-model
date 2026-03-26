import type { spacings } from './theme/constants'
import type { ColorOptions } from './theme/interfaces'

type Element = JSX.Element | string | number | boolean | null
export type ReactNode = Element | Element[]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericObject = Record<string | number | symbol, any>

export type EmptyObject = Record<string, never>

export type SpacingOrZero = keyof typeof spacings | '0'
export type Spacings = {
  top?: SpacingOrZero
  left?: SpacingOrZero
  bottom?: SpacingOrZero
  right?: SpacingOrZero
}

export type Border = {
  width?: string
  style?:
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inherit'
    | 'initial'
    | 'inset'
    | 'none'
    | 'outset'
  color: ColorOptions | 'transparent'
}

export type Borders =
  | Border
  | Partial<{ [key in 'top' | 'left' | 'bottom' | 'right']: Border }>

export type { ThemeInterface } from './theme/interfaces'

export * from './components/Input/components/Select/interfaces'

export type { Filter } from './components/Filters/Filters/interfaces'
export type { AppliedFilter } from './components/Filters/interfaces'

export type { Transition } from './components/Transition/interfaces'

export type {
  TabComponent,
  TabComponents,
  TabProps,
  TabProvider,
} from './components/Tabs/interfaces'

export type * from './components/Select/types'
