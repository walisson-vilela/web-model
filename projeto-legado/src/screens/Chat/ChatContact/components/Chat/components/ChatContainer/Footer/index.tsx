import React, { useState } from 'react'

import emojiData from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FiMic, FiPaperclip, FiSmile } from 'react-icons/fi'

import { useOnClickOutside } from '../../../../../../../../utils/hooks'
import { useChat } from '../../../context'

import * as S from './styles'

const Footer = () => {
  const [activeIcons, setActiveIcons] = useState(false)
  const closeIcons = useOnClickOutside(() => setActiveIcons(false))
  const [message, setMessage] = useState('')
  const { openSideBar, uploadFiles } = useChat()

  return (
    <React.Fragment>
      <S.Container activeSideBar={openSideBar}>
        <S.LeftIcons>
          <FiSmile
            size={20}
            color='#C8C8C8'
            onClick={() => setActiveIcons(true)}
          />

          <S.Label htmlFor='files'>
            <input
              type='file'
              multiple
              id='files'
              onChange={(e) => uploadFiles(e)}
            />
            <FiPaperclip size={20} color='#C8C8C8' />
          </S.Label>
        </S.LeftIcons>

        <S.TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <S.RightIcons>
          <FiMic size={20} color='#C8C8C8' />
        </S.RightIcons>
      </S.Container>
      {activeIcons && (
        <S.PickerContainer ref={closeIcons}>
          <Picker
            id='teste'
            data={emojiData}
            onEmojiSelect={(e) => setMessage((prev) => prev + e.native)}
            searchPosition='none'
            previewPosition='none'
            maxFrequentRows={0}
            locale='pt'
          />
        </S.PickerContainer>
      )}
    </React.Fragment>
  )
}

export default Footer
