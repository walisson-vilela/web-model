import React from 'react'

import {
  Body,
  Footer,
  Header,
  Modal as SemanticModal,
  Subtitle,
  Toolbar,
} from './components'
import { isOppenedModal } from './functions'
import { OpenedModal } from './interfaces'

export type ModalState = OpenedModal | JSX.Element | null

interface ModalProps {
  modal: ModalState
}

const Modal: React.FunctionComponent<ModalProps> & {
  Modal: typeof SemanticModal
  Header: typeof Header
  Body: typeof Body
  Footer: typeof Footer
  Toolbar: typeof Toolbar
  Subtitle: typeof Subtitle
} = Object.assign(
  (props: ModalProps) => {
    const { modal } = { ...props }

    return (
      <React.Fragment>
        {!isOppenedModal(modal) ? (
          modal
        ) : (
          <SemanticModal
            size={modal.size || 'tiny'}
            className={modal.className || ''}
            style={{
              ...(modal.modalStyles || {}),
            }}
            open
          >
            <Header content={modal.title} color={modal.titleColor} />

            <Body
              style={{
                ...(modal.contentPadding
                  ? { padding: modal.contentPadding }
                  : {}),
                ...(modal.contentStyles || {}),
              }}
            >
              {modal.content}
            </Body>

            <Footer
              {...({
                buttonType: modal.buttonType,
                actions: modal.actions,
              } as Parameters<typeof Footer>[0])}
            />
          </SemanticModal>
        )}
      </React.Fragment>
    )
  },
  {
    Modal: SemanticModal,
    Header,
    Body,
    Footer,
    Toolbar,
    Subtitle,
  },
)

export default Modal
