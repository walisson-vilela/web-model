import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import type { Option } from '@mw-kit/mw-ui/dist/components/Menu/interfaces'

import type { Card } from '../../../components/types'
import { useModalContext } from '../../../contexts'
import type { PresenceListHistory } from '../../../modals'

const presenceListHistory = (card: Card): Option => {
  const { openModal, closeModal } = useModalContext<{
    PresenceListHistory: typeof PresenceListHistory
  }>()

  return {
    label: <MwEllipsisContainer>Lista de Impactados</MwEllipsisContainer>,
    data: card,
    rules: [],
    onClick: () => {
      openModal('PresenceListHistory', { card, close: closeModal })
    },
  }
}

export default presenceListHistory
