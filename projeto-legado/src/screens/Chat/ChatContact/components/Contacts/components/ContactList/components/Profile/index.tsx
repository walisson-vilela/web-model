import React, { useContext } from 'react'

import { FiMoreVertical } from 'react-icons/fi'
import { Dropdown } from 'semantic-ui-react'

import ContactsContext from '../../../../context'

import { ProfileContainer, ProfileInfo, ProfileMore } from './styles'

const Profile = () => {
  const { setNewGroupTab } = useContext(ContactsContext)

  return (
    <ProfileContainer>
      <ProfileInfo>
        <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80' />
        <strong>Letícia Alcantara da Silva Losqui</strong>
      </ProfileInfo>
      <ProfileMore>
        <Dropdown icon={<FiMoreVertical size={18} color='#B8B9BB' />}>
          <Dropdown.Menu direction='left'>
            <Dropdown.Item
              content={'Novo Grupo'}
              onClick={() => setNewGroupTab(true)}
            />
          </Dropdown.Menu>
        </Dropdown>
      </ProfileMore>
    </ProfileContainer>
  )
}

export default Profile
