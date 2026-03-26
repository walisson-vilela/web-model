import React, { useContext } from 'react'

import NewGroupContext from '../../../../context'

import { ButtonContainer, ButtonInput } from './styles'

const ButtonNext = () => {
  const { setConfigGroupTab } = useContext(NewGroupContext)
  return (
    <ButtonContainer>
      <ButtonInput onClick={() => setConfigGroupTab(true)}>
        <span>Avançar</span>
      </ButtonInput>
    </ButtonContainer>
  )
}

export default ButtonNext
