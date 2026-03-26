import React, { useContext } from 'react'

import { Button, Modal } from 'semantic-ui-react'

import { ManagerEventContext } from '../../context'

interface ModalActionsProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setOpenNotificationModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalActions = ({
  setOpenModal,
  setOpenNotificationModal,
}: ModalActionsProps) => {
  const { disabled } = useContext(ManagerEventContext)

  return (
    <Modal.Actions>
      <Button
        basic
        className='tertiary'
        content='Cancelar'
        onClick={() => {
          if (!disabled) {
            setOpenNotificationModal(true)
          } else {
            setOpenModal(false)
          }
        }}
      />
      <Button primary content='Salvar' onClick={() => {}} />
    </Modal.Actions>
  )
}
