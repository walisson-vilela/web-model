import React from 'react'

import { FiMoreVertical } from 'react-icons/fi'
import { Dropdown } from 'semantic-ui-react'

import * as S from './styles'

const Participant = () => {
  return (
    <S.Container>
      <S.Header>
        <div>
          <strong> Leticia Alcântara Martins Melo...</strong>
          <span> Adminstrador</span>
        </div>
      </S.Header>
      <Dropdown
        icon={null}
        trigger={<FiMoreVertical />}
        floating
        direction={'left'}
      />
    </S.Container>
  )
}

export default Participant
