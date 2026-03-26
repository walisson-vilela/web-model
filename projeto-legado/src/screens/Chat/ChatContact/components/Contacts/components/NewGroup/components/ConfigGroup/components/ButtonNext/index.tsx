import React, { useContext } from 'react'

import ContactsContext from '../../../../../../context'
import NewGroupContext from '../../../../context'

import { ButtonContainer, ButtonInput } from './styles'

const ButtonNext = () => {
  const { name } = useContext(NewGroupContext)
  const { setNewGroupTab } = useContext(ContactsContext)

  return (
    <ButtonContainer>
      <ButtonInput
        disabled={name.length === 0}
        onClick={() => setNewGroupTab(false)}
      >
        <span>Avançar</span>
      </ButtonInput>
    </ButtonContainer>
  )
}

export default ButtonNext
