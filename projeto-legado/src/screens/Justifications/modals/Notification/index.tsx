import React from 'react'

import { Button, Modal } from 'semantic-ui-react'

import * as S from './styles'

interface NotificationModalProps {
  props: {
    haveCancel?: boolean
    title: string
    description: string | JSX.Element
    actions: JSX.Element[]
    setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
    setOpenModalJSX?: React.Dispatch<React.SetStateAction<JSX.Element>>
  }
}

const Notification = ({ props }: NotificationModalProps) => {
  const {
    title,
    actions,
    description,
    haveCancel = true,
    setOpenModal,
    setOpenModalJSX,
  } = props
  return (
    <Modal open size='tiny'>
      <Modal.Header>
        <S.ModalHeaderText>{title}</S.ModalHeaderText>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <S.ModalDescriptionText>{description}</S.ModalDescriptionText>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <S.Buttons>
          {haveCancel && (
            <Button
              content='Cancelar'
              basic
              className='tertiary'
              onClick={() => {
                setOpenModal
                  ? setOpenModal(false)
                  : setOpenModalJSX(<React.Fragment />)
              }}
            />
          )}
          {actions}
        </S.Buttons>
      </Modal.Actions>
    </Modal>
  )
}

export default Notification
