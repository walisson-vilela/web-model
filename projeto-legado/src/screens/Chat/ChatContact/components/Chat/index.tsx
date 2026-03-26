import React from 'react'

import { useChat } from '../Chat/context'

import Footer from './components/ChatContainer/Footer'
import Header from './components/Header'
import SideBar from './components/SideBar'
import Upload from './components/Upload'
import * as S from './styles'

const Chat = () => {
  const { openUploadModal } = useChat()

  return (
    <S.Container>
      {openUploadModal ? (
        <React.Fragment>
          <Header />
          <Upload />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <S.Content>
            <Header />
            <SideBar />
          </S.Content>
          <div style={{ flex: 1 }} />
          <Footer />
        </React.Fragment>
      )}
    </S.Container>
  )
}

export default Chat
