export interface PlaceholderProps {
  loading: boolean
  type:
    | 'template1'
    | 'template2'
    | 'template3'
    | 'template4'
    | 'template5'
    | 'template6'
    | 'template7'
    | 'template8'
    | 'template9'
    | 'template10'
}

export interface HeaderLineProps {
  $size: 'mini' | 'small' | 'medium' | 'large'
  $color: string
  $height: string
  $width?: string
}
