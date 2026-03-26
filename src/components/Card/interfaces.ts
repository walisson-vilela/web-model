export interface CardProps {
  size: 'mini' | 'small' | 'medium' | 'big'
  borderType: 'info' | 'danger' | 'success' | 'warning' | 'none'
  children: React.ReactNode
}

export interface StyledCardProps {
  $size: CardProps['size']
  $borderType: CardProps['borderType']
}
