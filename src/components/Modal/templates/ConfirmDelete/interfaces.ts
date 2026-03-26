import type { ModalProps } from '../../interfaces'

export interface ConfirmDeleteProps
  extends Omit<
    ModalProps,
    | 'size'
    | 'customSize'
    | 'color'
    | 'inverted'
    | 'loading'
    | 'footer'
    | 'footerMessage'
  > {
  cancelAction: React.MouseEventHandler<HTMLButtonElement>
  confirmAction: React.MouseEventHandler<HTMLButtonElement>
}
