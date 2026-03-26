import type { FeatherIcon } from '../Icon/interfaces'

export interface ToasterTypes {
  color: 'success' | 'error' | 'warning'
  size: 'normal' | 'large'
  title: string
  description: string
  onClose: Exclude<FeatherIcon['onClick'], undefined>
}

export type StyledToasterProps = {
  $color: ToasterTypes['color']
  $size: ToasterTypes['size']
}
