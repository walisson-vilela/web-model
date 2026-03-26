import { sizeProps } from './constants'

export type ImageResizerProps = {
  event: MouseEvent
  close: () => void
}

export type SizeState = { [key in keyof typeof sizeProps]?: number }

export type Position = {
  top?: number
  left?: number
  bottom?: number
  right?: number
}
