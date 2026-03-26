import React, { useContext, useState } from 'react'

import { FiArrowLeft, FiMoreVertical } from 'react-icons/fi'
import { Popup } from 'semantic-ui-react'

import { useOnClickOutside } from '../../../../../../../../../../../utils/hooks'
import ContactsContext from '../../../../../../context'

import {
  ProfileContainer,
  ProfileInfo,
  ProfileMore,
  ProfileNewGroup,
} from './styles'

const Header = () => {
  const { setNewGroupTab } = useContext(ContactsContext)
  const [openMore, setOpenMore] = useState<boolean>(false)
  const openMoreRef = useOnClickOutside(() => setOpenMore(false))

  return (
    <ProfileContainer>
      <ProfileInfo>
        <FiArrowLeft
          size={20}
          color='#B2B2B2'
          onClick={() => setNewGroupTab(false)}
        />
        <strong>Adicionar Participantes do Grupo</strong>
      </ProfileInfo>
      <ProfileMore>
        <Popup
          on='click'
          pinned
          open={openMore}
          position='bottom right'
          offset={[12, 0]}
          content={
            <ProfileNewGroup ref={openMoreRef}>
              <span>PENDENTE</span>
            </ProfileNewGroup>
          }
          trigger={
            <FiMoreVertical
              color='#C8C8C8'
              size={16}
              onClick={() => setOpenMore(true)}
            />
          }
        />
      </ProfileMore>
    </ProfileContainer>
  )
}

export default Header
