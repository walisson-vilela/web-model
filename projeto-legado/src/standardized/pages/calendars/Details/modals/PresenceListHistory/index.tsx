import { Modal } from '../../components'

import { Body } from './components'
import { PresenceListHistoryContext } from './context'
import type { PresenceListHistoryProps } from './types'

const PresenceListHistory = (props: PresenceListHistoryProps) => {
  const { card, close } = props

  return (
    <PresenceListHistoryContext.Provider value={{ card }}>
      <Modal
        {...{
          modal: {
            size: 'large',
            style: { width: 1095 },
          },
          header: {
            $appearance: 'info',
            children: 'Lista de Impactados (Historico)',
          },
          body: Body,
          footer: [
            {
              appearance: 'solid',
              children: 'OK',
              onClick: close,
            },
          ],
        }}
      />
    </PresenceListHistoryContext.Provider>
  )
}

export default PresenceListHistory
