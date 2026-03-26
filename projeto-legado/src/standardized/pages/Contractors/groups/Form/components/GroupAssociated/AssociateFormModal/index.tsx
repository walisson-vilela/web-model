import { useState } from 'react'

import { Modal } from 'semantic-ui-react'

import GridSelector from '../../../../../../../../components/GridSelector'
import MwModal from '../../../../../../../../components/MwModal'
import { AssociatedGroup } from '../../../types'

import useLeft from './components/Left'
import useRight from './components/Right'
import Submit from './components/Submit'

interface IAssociateFormModal {
  onClose: () => void
  onSave: (selected: AssociatedGroup[]) => void
  selected: AssociatedGroup[]
}

const AssociateFormModal = ({
  onClose,
  selected: initial,
  onSave,
}: IAssociateFormModal) => {
  const [selected, setSelected] = useState<AssociatedGroup[]>([...initial])

  return (
    <Modal size='large' open>
      <MwModal.Header color='blue' content='Gerenciar Contas' />

      <GridSelector.Container
        left={useLeft}
        right={useRight}
        selected={[selected, setSelected]}
      />

      <Submit onClose={onClose} onSave={() => onSave([...selected])} />
    </Modal>
  )
}

export default AssociateFormModal
