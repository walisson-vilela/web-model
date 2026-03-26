import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import type { Option } from '@mw-kit/mw-ui/dist/components/Menu/interfaces'

import type { Card } from '../../../components/types'
import { useModalContext } from '../../../contexts'
import type { ExclusionListManager } from '../../../modals'

const exclusionListManager = (card: Card): Option => {
  const { openModal, closeModal } = useModalContext<{
    ExclusionListManager: typeof ExclusionListManager
  }>()

  return {
    label: <MwEllipsisContainer children='Lista de Exclusão' />,
    data: card,
    rules: [],
    onClick: () => {
      openModal('ExclusionListManager', { card, close: closeModal })
    },
  }
}

export default exclusionListManager
