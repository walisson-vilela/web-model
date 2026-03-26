import { useCallback, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import moment from 'moment'
import toast from 'react-hot-toast'

import Modal from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import useHierarchyContext from '../../../context'

import { createPrograming } from './service'

interface IProgramingModal {
  onClose: () => void
}

const NotificationModal = (props: IProgramingModal) => {
  const { onClose } = props

  const {
    levels: [levels],
    hierarchy,
    manualElements: [manualElements],
    loadLevels,
  } = useHierarchyContext()

  const scheduleDate = moment().isoWeekday(8)

  const [loading, setLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    if (!hierarchy) return

    setLoading(true)
    try {
      await createPrograming(hierarchy.id, scheduleDate, manualElements, levels)
      onClose()
      loadLevels()
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
      setLoading(false)
    }
  }, [hierarchy?.id, manualElements, levels, scheduleDate])

  return (
    <Modal.Modal size='tiny' open>
      <Modal.Header color='white'>Programação</Modal.Header>
      <Modal.Body style={{ justifyContent: 'normal' }}>
        <div>
          A alteração da hierarquia será programada para entrar em vigor a
          partir do dia {scheduleDate.format('DD/MM/YYYY')}. Deseja continuar?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <MwButton appearance='borderless' onClick={onClose}>
          Cancelar
        </MwButton>
        <MwButton loading={loading} onClick={onSubmit}>
          Sim
        </MwButton>
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default NotificationModal
