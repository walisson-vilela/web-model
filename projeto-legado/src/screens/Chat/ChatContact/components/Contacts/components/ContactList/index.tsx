import React from 'react'

import Contacts from './components/Contacts'
import Profile from './components/Profile'
import Search from './components/Search'
import { ContactListContainer } from './styles'

const ContactList = () => {
  return (
    <ContactListContainer>
      <Profile />
      <Search />
      <Contacts />
    </ContactListContainer>
  )
}

export default ContactList
