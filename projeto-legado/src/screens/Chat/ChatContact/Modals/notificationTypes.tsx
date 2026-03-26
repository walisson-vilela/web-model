import React from 'react'

import { Button } from 'semantic-ui-react'

import { NotificationModalProps } from './NotificationModal/Index'

export const ClearChatGroup: NotificationModalProps = {
  props: {
    haveCancel: true,
    title: 'Limpar conversa',
    description: 'Tem certeza que deseja limpar a conversa?',
    actions: [
      <Button
        color='red'
        content='Só para mim'
        onClick={() => {}}
        key='ClearChatGroupOnlyMe'
      />,
      <Button
        color='red'
        content='Para Todos'
        onClick={() => {}}
        key='ClearChatGroupAll'
      />,
    ],
  },
}

export const DownloadChat: NotificationModalProps = {
  props: {
    haveCancel: true,
    title: 'Baixar conversa',
    description: 'Tem certeza que deseja fazer o download da conversa?',
    actions: [
      <Button primary content='Baixar' onClick={() => {}} key='DownloadChat' />,
    ],
  },
}

export const DeleteGroup: NotificationModalProps = {
  props: {
    haveCancel: true,
    title: 'Apagar grupo',
    description: 'Tem certeza que deseja apagar esse grupo?',
    actions: [
      <Button
        color='red'
        content='Apagar'
        onClick={() => {}}
        key='DeleteGroup'
      />,
    ],
  },
}

export const OutGroup: NotificationModalProps = {
  props: {
    haveCancel: true,
    title: 'Sair do grupo',
    description: 'Tem certeza que deseja sair do grupo?',
    actions: [
      <Button color='red' content='Sair' onClick={() => {}} key='OutGroup' />,
    ],
  },
}
