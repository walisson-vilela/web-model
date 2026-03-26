import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import type { Option } from '@mw-kit/mw-ui/dist/components/Menu/interfaces'

import type { Card } from '../../../components/types'
import { useModalContext } from '../../../contexts'
import type { ExclusionListHistory } from '../../../modals'

const exclusionListHistory = (card: Card): Option => {
  const { openModal, closeModal } = useModalContext<{
    ExclusionListHistory: typeof ExclusionListHistory
  }>()

  return {
    label: <MwEllipsisContainer>Lista de Exclusão</MwEllipsisContainer>,
    data: card,
    rules: [],
    onClick: () => {
      openModal('ExclusionListHistory', { card, close: closeModal })
    },
  }
}

export default exclusionListHistory
