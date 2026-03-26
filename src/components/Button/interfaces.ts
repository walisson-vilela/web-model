import type { ColorOptions } from '../../theme/interfaces'

export type Size = 'tiny' | 'mini' | 'small' | 'large' | 'big'

export interface CommonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /**
   * Specifies the button size.
   */
  size: Size
  /**
   * Specifies if the button style is solid, bordered or text only.
   */
  appearance: 'solid' | 'bordered' | 'link' | 'borderless'
  /**
   * Define the color of button.
   */
  color?: ColorOptions
  /**
   * Define if button is loading.
   */
  loading: number
}

export interface StyledButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  $size: CommonProps['size']
  $appearance: CommonProps['appearance']
  $color?: CommonProps['color']
  $loading: CommonProps['loading']
}

export interface ButtonProps extends Omit<Partial<CommonProps>, 'loading'> {
  /**
   * Text inside the button.
   */
  content?: string
  /**
   * Define if button is loading.
   */
  loading?: boolean
}
