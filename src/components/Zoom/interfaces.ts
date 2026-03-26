export interface ZoomProps {
  src: string
  width?: number | string
  height?: number | string
}

export interface StyledZoomProps {
  $width?: ZoomProps['width']
  $height?: ZoomProps['height']
}
