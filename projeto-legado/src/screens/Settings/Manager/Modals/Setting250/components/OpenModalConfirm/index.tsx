import React from 'react'

import toast from 'react-hot-toast'
import { Button, Modal } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { dateOrDefault } from '../../../../../../../utils/Formatters'
import { labels } from '../../constants'
import { OpenModalConfirmationProps } from '../../interfaces'
import { saveSettingsData } from '../../services'

const OpenModalConfirm = ({
  currentSchedule,
  currentType,
  form,
  setOpenNotification,
  setModal,
}: OpenModalConfirmationProps) => {
  const onSubmit = async () => {
    try {
      const payload = {
        type: form.type,
        due_date: form.date,
      }
      await saveSettingsData(payload)
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setOpenNotification(<React.Fragment />)
      setModal(null)
    }
  }

  return (
    <Modal open size='tiny'>
      <Modal.Header>Notificação</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {currentSchedule && form.type === currentType ? (
            <p>
              Você esta cancelando a mudança de credencial de{' '}
              <b>{labels[currentType]}</b> para{' '}
              <b>{labels[currentSchedule.type]}</b> . A credencial permanecerá
              como <b>{labels[currentType]}</b> tem certeza que deseja cancelar?
            </p>
          ) : (
            <p>
              Você esta mudando a Credencial de <b>{labels[currentType]}</b>{' '}
              para <b>{labels[form.type]}</b> que ocorrerá no dia{' '}
              {dateOrDefault(form.date, '-', 'DD/MM/YYYY')}. Tem certeza que
              deseja alterar?
            </p>
          )}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content='Cancelar'
          basic
          className='tertiary'
          onClick={() => setOpenNotification(<React.Fragment />)}
        />
        <Button content='Confirmar' primary onClick={() => onSubmit()} />
      </Modal.Actions>
    </Modal>
  )
}

export default OpenModalConfirm
