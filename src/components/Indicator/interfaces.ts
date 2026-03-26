import type { ColorOptions } from '../../theme/interfaces'

export type Types =
  | 'default'
  | 'info'
  | 'danger'
  | 'success'
  | 'warning'
  | 'temporary'

export type Sizes = 'mini' | 'medium' | 'small'

export interface IndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  size: Sizes
  type: Types
  labelColor: ColorOptions
}

export type StyledIndicatorProps = {
  $size: IndicatorProps['size']
  $type: IndicatorProps['type']
  $labelColor: IndicatorProps['labelColor']
}
