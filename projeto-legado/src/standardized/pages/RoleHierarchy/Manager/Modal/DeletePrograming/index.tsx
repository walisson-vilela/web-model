import { useCallback, useState } from 'react'

import Modal, { ModalState } from '../../../../../../components/MwModal'
import useHierarchyContext from '../../../context'
import { deleteSchedule } from '../../../services'

interface IDeletePrograming {
  setModal: React.Dispatch<React.SetStateAction<ModalState>>
}

const DeletePrograming = (props: IDeletePrograming) => {
  const {
    hierarchy,
    loadData,

    loadLevels,
  } = useHierarchyContext()

  const { setModal } = props
  const [loading, setLoading] = useState(false)

  const onConfirm = useCallback(async () => {
    if (!hierarchy) return
    setLoading(true)
    try {
      await deleteSchedule(hierarchy.id)
      setModal(null)

      loadLevels()
      loadData()
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }, [hierarchy])

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header color='white'>Deletar Programação</Modal.Header>
      <Modal.Body>
        <div>
          Ao deletar a programação, a nova estrutura não será mais processada e
          nem entrará em vigor. Deseja deletar a programação?
        </div>
      </Modal.Body>
      <Modal.Footer
        buttonType='MwButton'
        actions={[
          {
            content: 'Cancelar',
            onClick: () => setModal(null),
            appearance: 'borderless',
          },
          {
            content: 'Sim',
            onClick: onConfirm,
            loading: loading,
          },
        ]}
      />
    </Modal.Modal>
  )
}

export default DeletePrograming
