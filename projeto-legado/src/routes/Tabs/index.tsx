import React, { useState } from 'react'

import Modal, { ModalState } from '../../components/MwModal'
import RouteComponents from '../RouteComponents'
import { useTabsContext } from '../TabsProvider'

import * as S from './styles'

const Tabs = () => {
  const {
    tabs: [tabs, setTabs],
    active: [active, setActive],
    close: closeTab,
  } = useTabsContext()

  const [modal, setModal] = useState<ModalState | null>(null)

  return (
    <React.Fragment>
      <S.Tabs
        options={[tabs, setTabs]}
        onClose={(_i, tab) => {
          if (!tab.data.dirty) return true

          setModal({
            title: 'Notificação',
            content:
              'Existem dados que ainda não foram salvos, vocês deseja realmente sair da tela?',
            buttonType: 'MwButton',
            actions: [
              {
                appearance: 'borderless',
                type: 'button',
                onClick: () => setModal(null),
                children: 'Cancelar',
              },
              {
                type: 'button',
                onClick: () => {
                  closeTab(tab.data.route)
                  setModal(null)
                },
                children: 'Sim',
              },
            ],
          })

          return false
        }}
        active={[active, setActive]}
        spacing='0'
        components={RouteComponents}
      />

      <Modal modal={modal} />
    </React.Fragment>
  )
}

export default Tabs
