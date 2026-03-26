import type { ModalProps } from '../../interfaces'

export interface ConfirmSuccessProps
  extends Omit<
    ModalProps,
    | 'size'
    | 'customSize'
    | 'color'
    | 'inverted'
    | 'loading'
    | 'footer'
    | 'footerMessage'
    | 'title'
  > {
  homeAction: React.MouseEventHandler<HTMLButtonElement>
  cancelAction: React.MouseEventHandler<HTMLButtonElement>
  confirmAction: React.MouseEventHandler<HTMLButtonElement>
}
