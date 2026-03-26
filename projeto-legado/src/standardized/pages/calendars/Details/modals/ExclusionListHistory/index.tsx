import { useState } from 'react'

import { Modal } from '../../components'
import type { CardModal } from '../types'

import { Body } from './components'
import { ExclusionHistoryListContext } from './context'
import type { Value } from './types'

const ExclusionListHistory: CardModal = (props) => {
  const { card, close } = props

  const [value, setValue] = useState<Value>({
    id: card.id,
    starts_at: card.starts_at,
    ends_at: card.ends_at,
    user_count: 0,
    team_count: 0,
  })

  const [loading, setLoading] = useState<boolean>(false)

  return (
    <ExclusionHistoryListContext.Provider
      value={{ card, value: [value, setValue], loading: [loading, setLoading] }}
    >
      <Modal
        {...{
          modal: {
            size: 'large',
            style: { width: 1095 },
          },
          header: {
            $appearance: 'info',

            children: 'Lista de Exclusão (Historico)',
          },
          body: Body,
          footer: [
            {
              appearance: 'solid',
              children: 'Ok',
              onClick: close,
            },
          ],
        }}
      />
    </ExclusionHistoryListContext.Provider>
  )
}

export default ExclusionListHistory
