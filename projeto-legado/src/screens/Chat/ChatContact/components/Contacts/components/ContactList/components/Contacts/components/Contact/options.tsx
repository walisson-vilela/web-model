import React from 'react'

import { Dropdown } from 'semantic-ui-react'

import { useModalContext } from '../../../../../../../../Modals/context'
import {
  ClearChatGroup,
  DeleteGroup,
  DownloadChat,
  OutGroup,
} from '../../../../../../../../Modals/notificationTypes'

interface OptionsProps {
  isGroup: boolean
}

const Options = ({ isGroup }: OptionsProps): JSX.Element => {
  const { handleOpenModal, handleOpenNotificationModal } = useModalContext()

  const isGroupOptions = [
    {
      key: 1,
      text: 'Marcar como lida',
      onClick: () => {},
    },

    {
      key: 2,
      text: 'Fixar Conversa',
      onClick: () => {},
    },

    {
      key: 3,
      text: 'Limpar Conversa',
      onClick: () => handleOpenNotificationModal(ClearChatGroup),
    },
    {
      key: 4,
      text: 'Gerenciar Grupo',
      onClick: () => handleOpenModal(),
    },

    {
      key: 5,
      text: 'Sair do grupo',
      onClick: () => handleOpenNotificationModal(OutGroup),
    },
    {
      key: 6,
      text: 'Apagar Grupo',
      onClick: () => handleOpenNotificationModal(DeleteGroup),
    },

    {
      key: 7,
      text: 'Baixar Conversa',
      onClick: () => handleOpenNotificationModal(DownloadChat),
    },
  ]

  const notGroupOptions = [
    {
      key: 1,
      text: 'Marcar como lida',
      onClick: () => {},
    },

    {
      key: 2,
      text: 'Fixar Conversa',
      onClick: () => {},
    },

    {
      key: 3,
      text: 'Limpar Conversa',
      onClick: () => handleOpenNotificationModal(ClearChatGroup),
    },

    {
      key: 4,
      text: 'Baixar Conversa',
      onClick: () => handleOpenNotificationModal(DownloadChat),
    },
  ]
  return isGroup ? (
    <React.Fragment>
      {isGroupOptions.map((option) => (
        <Dropdown.Item
          key={option.key}
          content={option.text}
          onClick={option.onClick}
        />
      ))}
    </React.Fragment>
  ) : (
    <React.Fragment>
      {notGroupOptions.map((option) => (
        <Dropdown.Item
          key={option.key}
          content={option.text}
          onClick={option.onClick}
        />
      ))}
    </React.Fragment>
  )
}

export default Options
