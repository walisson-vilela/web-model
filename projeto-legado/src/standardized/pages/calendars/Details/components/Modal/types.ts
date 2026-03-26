import React from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import { PopupProps, ModalProps as SemanticModalProps } from 'semantic-ui-react'

type MwButtonProps = Parameters<typeof MwButton>[0]

export type HeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  $appearance?: 'info' | 'success' | 'error' | 'warning'
}

export type BodyProps = React.HTMLAttributes<HTMLDivElement>

export type FooterButtonProps = MwButtonProps & {
  popup?: Omit<PopupProps, 'trigger'>
}

export type ModalProps = {
  modal?: Partial<SemanticModalProps>
  container?: React.HTMLAttributes<HTMLDivElement>
  header: React.ReactNode | HeaderProps | React.VoidFunctionComponent
  body: React.ReactNode | BodyProps | React.VoidFunctionComponent
  footer: [
    FooterButtonProps | React.VoidFunctionComponent,
    ...(FooterButtonProps | React.VoidFunctionComponent)[],
  ]
}
