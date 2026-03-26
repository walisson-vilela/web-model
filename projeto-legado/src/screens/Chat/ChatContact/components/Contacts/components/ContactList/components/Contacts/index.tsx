import React from 'react'

import Contact from './components/Contact'
import { ContactsContainer } from './styles'

const Contacts = () => {
  return (
    <ContactsContainer>
      <Contact isSelected isGroup />
      <Contact isGroup />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
    </ContactsContainer>
  )
}

export default Contacts
