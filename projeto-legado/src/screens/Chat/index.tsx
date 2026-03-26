import React from 'react'

import { Header } from '../../components/Header'
import { createRouteTab } from '../../routes'

import ChatContact from './ChatContact'

const Chat = createRouteTab(
  () => {
    return (
      <React.Fragment>
        <Header description='Use os campos abaixo para enviar mensagens instantâneas' />
        <ChatContact />
      </React.Fragment>
    )
  },
  (props) => <>{props.children}</>,
)

export default Chat
