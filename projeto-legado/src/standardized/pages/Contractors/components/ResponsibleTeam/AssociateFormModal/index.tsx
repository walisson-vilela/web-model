import { useState } from 'react'

import GridSelector from '../../../../../../components/GridSelector'
import MwModal from '../../../../../../components/MwModal'
import { AssociatedUser } from '../types'

import useLeft from './components/Left'
import useRight from './components/Right'
import Submit from './components/Submit'

interface IAssociateFormModal {
  onClose: () => void
  onSave: (selected: AssociatedUser[]) => void
  selected: AssociatedUser[]
}

const AssociateFormModal = ({
  onClose,
  onSave,
  selected: initial,
}: IAssociateFormModal) => {
  const [selected, setSelected] = useState<AssociatedUser[]>([...initial])
  return (
    <MwModal.Modal size='large' open>
      <MwModal.Header color='blue' content='Gerenciar Usuários' />

      <GridSelector.Container
        selected={[selected, setSelected]}
        left={useLeft}
        right={useRight}
      />

      <Submit onClose={onClose} onSave={() => onSave([...selected])} />
    </MwModal.Modal>
  )
}

export default AssociateFormModal
