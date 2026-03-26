import React from 'react'

import ModalContext from './Modals/context'
import Chat from './components/Chat'
import ChatContext from './components/Chat/context'
import Contacts from './components/Contacts'
import * as S from './styles'

const ChatContact = () => {
  return (
    <ModalContext>
      <S.Container>
        <Contacts />
        <ChatContext>
          <Chat />
        </ChatContext>
      </S.Container>
    </ModalContext>
  )
}

export default ChatContact
