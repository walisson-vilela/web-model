import type { ModalProps } from '../../interfaces'

export interface AuditProps
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
  cancelAction: React.MouseEventHandler<HTMLButtonElement>
  confirmAction: React.MouseEventHandler<HTMLButtonElement>
}
