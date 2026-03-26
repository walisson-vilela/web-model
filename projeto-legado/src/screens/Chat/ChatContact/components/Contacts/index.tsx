import React, { useState } from 'react'

import ImageNotification from '../../Modals/ImageNotification'
import { useModalContext } from '../../Modals/context'

import ContactList from './components/ContactList'
import NewGroup from './components/NewGroup'
import ContactsContext from './context'
import * as S from './styles'

const Contacts = () => {
  const [newGroupTab, setNewGroupTab] = useState<boolean>(false)
  const { imageNotification } = useModalContext()

  return (
    <ContactsContext.Provider
      value={{
        setNewGroupTab,
      }}
    >
      <S.Container>
        {!newGroupTab ? <ContactList /> : <NewGroup />}
        {imageNotification && <ImageNotification />}
      </S.Container>
    </ContactsContext.Provider>
  )
}

export default Contacts
