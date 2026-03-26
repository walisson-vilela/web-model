import { useState } from 'react'

import { Button, Modal } from 'semantic-ui-react'

import Tabs from '../../../../components/Tabs'
import useJustificationsContext from '../../provider'
import Notification from '../Notification'

import { ModalActions } from './components/Actions'
import { ManagerEventProvider } from './context'
import { ManagerEventsProps } from './interface'
import * as S from './styles'
import { Events } from './tabs/Events'
import { History } from './tabs/History'

export const ManagerEvents = ({ setOpenModal }: ManagerEventsProps) => {
  //Configurações das Abas

  const {
    managerProps,
    activeTab: [activeTab, setActiveTab],
  } = useJustificationsContext()

  const [openNotificationModal, setOpenNotificationModal] =
    useState<boolean>(false)

  const tabOptions = [
    {
      label: 'Justificativas',
      component: <Events {...managerProps} />,
    },
    {
      label: 'Histórico',
      component: <History {...managerProps} />,
    },
  ]

  return (
    <ManagerEventProvider>
      <Modal open size='large'>
        <S.Header>
          <strong>Gerenciar Eventos</strong>
        </S.Header>
        <Modal.Content>
          <S.Content>
            <S.User>
              <span>Usuário: Cristiano Ronaldo Almeida | ID:0001</span>
            </S.User>
            <S.TabContainter>
              <Tabs
                options={tabOptions}
                active={{
                  active: activeTab,
                  setActive: setActiveTab,
                }}
              />

              {tabOptions[activeTab].component}
            </S.TabContainter>
          </S.Content>
        </Modal.Content>
        <ModalActions
          setOpenModal={setOpenModal}
          setOpenNotificationModal={setOpenNotificationModal}
        />
        {openNotificationModal && (
          <Notification
            props={{
              title: 'Notificação',
              description:
                'Existem dados que ainda não foram salvos, você deseja realmente sair da tela?',
              actions: [
                <Button
                  key='1'
                  primary
                  content='Sim'
                  onClick={() => {
                    setOpenNotificationModal(false)
                    setOpenModal(false)
                  }}
                />,
              ],
              setOpenModal: setOpenNotificationModal,
            }}
          />
        )}
      </Modal>
    </ManagerEventProvider>
  )
}
