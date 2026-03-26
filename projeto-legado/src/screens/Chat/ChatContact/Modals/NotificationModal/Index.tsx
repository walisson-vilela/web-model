import React, { useContext } from 'react'

import { Button, Modal } from 'semantic-ui-react'

import { ModalContextProvider } from '../context'

import { ModalDescriptionText, ModalHeaderText } from './styles'

export interface NotificationModalProps {
  props: {
    haveCancel?: boolean
    title: string
    description: string
    actions: JSX.Element[]
  }
}

const NotificationModal = ({ props }: NotificationModalProps) => {
  const { handlecloseNotificationModal } = useContext(ModalContextProvider)
  const { title, description, actions, haveCancel } = props
  return (
    <Modal open size='tiny'>
      <Modal.Header>
        <ModalHeaderText>{title}</ModalHeaderText>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <ModalDescriptionText>{description}</ModalDescriptionText>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {haveCancel && (
          <Button
            content='Cancelar'
            basic
            className='tertiary'
            onClick={handlecloseNotificationModal}
          />
        )}
        {actions}
      </Modal.Actions>
    </Modal>
  )
}

export default NotificationModal
