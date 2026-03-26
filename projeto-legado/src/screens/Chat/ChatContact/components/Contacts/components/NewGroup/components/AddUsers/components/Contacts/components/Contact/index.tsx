import React from 'react'

import {
  ContactContainer,
  ContactInfo,
  ContactInfoDetails,
  ContactInfoImage,
} from './styles'

const Contact = () => {
  return (
    <ContactContainer>
      <ContactInfo>
        <ContactInfoImage>
          <img src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' />
        </ContactInfoImage>
        <ContactInfoDetails>
          <React.Fragment>
            <strong>Luiza Marta</strong>
            <span>Administrador</span>
          </React.Fragment>
        </ContactInfoDetails>
      </ContactInfo>
    </ContactContainer>
  )
}

export default Contact
