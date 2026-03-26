import type { ColorOptions } from '../../theme/interfaces'
import type { ButtonProps } from '../Button/interfaces'

export interface ModalProps {
  /**
   * Title on header of modal.
   */
  title?: string
  /**
   * Content on center of modal.
   */
  content?: string
  /**
   * Content on center of modal.
   */
  children?: string | JSX.Element
  /**
   * Define if header of modal is inverted.
   */
  inverted?: boolean
  /**
   * Define if content of modal is loading.
   */
  loading?: boolean
  /**
   * Content on footer of modal.
   */
  footer?: ButtonProps[]

  footerMessage?: string | JSX.Element

  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]

  closeOnClickOutside?: boolean

  closeOnEsc?: boolean

  /**
   * Specifies the modal size.
   */
  size?: 'custom' | 'small' | 'medium' | 'large'
  /**
   * Specifies the custom modal size.
   */
  customSize?: {
    width?: string
    height?: string
  }
  /**
   * Define the color of header and default confirm button.
   */
  color?: ColorOptions
}

export interface StyledModalProps {
  $size: Exclude<ModalProps['size'], undefined>
  $customSize?: ModalProps['customSize']
  $color: Exclude<ModalProps['color'], undefined>
  $inverted?: ModalProps['inverted']
}
