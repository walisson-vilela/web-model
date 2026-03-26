import React, { useState } from 'react'

import { FiChevronDown } from 'react-icons/fi'
import { Dropdown } from 'semantic-ui-react'

import Options from './options'
import {
  ArrowDown,
  ContactContainer,
  ContactInfo,
  ContactInfoDetails,
  ContactInfoImage,
  ContactMore,
} from './styles'

interface ContactProps {
  isSelected?: boolean
  isGroup?: boolean
}

const Contact = ({ isSelected, isGroup }: ContactProps) => {
  const [openMore, setOpenMore] = useState<boolean>(false)

  return (
    <ContactContainer isSelected={isSelected}>
      <ContactInfo>
        <ContactInfoImage>
          {isGroup ? (
            <img src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' />
          ) : (
            <img src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' />
          )}
        </ContactInfoImage>
        <ContactInfoDetails>
          {isGroup ? (
            <React.Fragment>
              <strong>Grupo dos gamers</strong>
              <span>Você, luiza, Angenor +6</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <strong>Luiza Marta</strong>
              <span>Administrador</span>
            </React.Fragment>
          )}
        </ContactInfoDetails>
      </ContactInfo>

      <ContactMore>
        <span>9:30</span>
        <Dropdown
          icon={
            <ArrowDown>
              <FiChevronDown
                color='#B2B2B2'
                size={16}
                onClick={() => setOpenMore(true)}
              />
            </ArrowDown>
          }
        >
          <Dropdown.Menu direction='left'>
            <Options isGroup={isGroup} />
          </Dropdown.Menu>
        </Dropdown>
      </ContactMore>
    </ContactContainer>
  )
}

export default Contact
