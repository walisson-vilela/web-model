import React, { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../../../../components/MwModal'
import useContext from '../../../context'

import Manager from './Manager'
import { BodyInterface } from './Manager/interfaces'
import * as S from './styled'

const AssociateFormModal = () => {
  const {
    form: { setValue, setValueOptions },
    setModal,
  } = useContext()

  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])
  const [alertMessage, setAlertMessage] = useState<boolean>(false)

  const onCancel = () => {
    setModal(null)
  }

  const onConfirm = () => {
    setValue('forms', [...checkeds], setValueOptions)
    setModal(null)
  }

  return (
    <Modal.Modal
      size='large'
      open
      style={{
        width: '1010px',
        height: '448px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
    >
      <Modal.Header color='blue'>Gerenciar Formulários</Modal.Header>

      <Modal.Body style={{ padding: '14px' }}>
        <Manager
          checkeds={{
            checkeds,
            setCheckeds,
          }}
          onAlert={setAlertMessage}
        />
      </Modal.Body>

      <Modal.Footer as={S.FooterConainer}>
        <div>
          {alertMessage && (
            <React.Fragment>
              Só é permitido selecionar <b>02 formulários.</b>
            </React.Fragment>
          )}
        </div>

        <div>
          <MwButton appearance='borderless' onClick={onCancel} size='large'>
            Cancelar
          </MwButton>

          <MwButton
            type='button'
            appearance='solid'
            onClick={onConfirm}
            size='large'
            disabled={checkeds.length === 0}
          >
            Confirmar
          </MwButton>
        </div>
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default AssociateFormModal
