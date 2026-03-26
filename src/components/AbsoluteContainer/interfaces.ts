import type {
  ColorOptions,
  SpacingOptions,
  ThemeInterface,
} from '../../theme/interfaces'
import type { Transition } from '../Transition/interfaces'

export type Position =
  | 'top right'
  | 'top left'
  | 'bottom right'
  | 'bottom left'
  | 'right top'
  | 'right bottom'
  | 'left top'
  | 'left bottom'

export interface References {
  top?: string
  left?: string
  bottom?: string
  right?: string
}

type TransitionArguments = Transition<
  'width' | 'max-width' | 'height' | 'max-height'
>

type CommonProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'content'
> & {
  width?: string | number
  height?: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  references?: References
  zIndex?: number
  pointer?:
    | {
        color?: ColorOptions | string | ((theme: ThemeInterface) => string)
        size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
        distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
      }
    | true
  bgColor?: ColorOptions | string | ((theme: ThemeInterface) => string)
} & (React.PropsWithChildren | { content: React.FunctionComponent })

export type AbsoluteContainerProps = CommonProps & {
  open: boolean
  position?: Position
  axis?: 'x' | 'y'
  center?: {
    x: number
    y: number
  }
  ref?: React.Ref<HTMLDivElement>
  /**
   * defines an element to be the bound reference when calculating auto position,
   * the window will be used by default
   * */
  boundRef?: HTMLDivElement | null
  transition?: Partial<Omit<TransitionArguments, 'active'>>
}

export type ContainerProps = {
  $bgColor?: CommonProps['bgColor']
  $width?: CommonProps['width']
  $height?: CommonProps['height']
  $maxWidth?: CommonProps['maxWidth']
  $maxHeight?: CommonProps['maxHeight']
  $references?: CommonProps['references']
  $pointer?: CommonProps['pointer']
  $zIndex?: CommonProps['zIndex']
  $position: Position | null
  $transition?: TransitionArguments
}
