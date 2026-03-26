import React, { useState } from 'react'

import { FiMoreVertical, FiSearch } from 'react-icons/fi'
import { Dropdown } from 'semantic-ui-react'

import { useOnClickOutside } from '../../../../../../../utils/hooks'
import { useModalContext } from '../../../../Modals/context'
import { useChat } from '../../context'
import * as S from '../../styles'

const Header = () => {
  const { handleOpenModal } = useModalContext()
  const { handleSideBar, openSideBar } = useChat()
  const [openPopup, setOpenPopup] = useState(false)
  const closePopUp = useOnClickOutside(() => setOpenPopup(false))
  console.log('openSideBar', openSideBar)
  const options = [
    {
      key: 1,
      text: 'Gerenciar Grupo',
      onClick: () => handleOpenModal(),
    },

    {
      key: 2,
      text: 'Apagar Grupo',
      onClick: () => setOpenPopup(true),
    },
  ]

  return (
    <S.HeaderContainer activeSideBar={openSideBar}>
      <S.ProfileContainer>
        <img
          src={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVT0oyQt6GZlBDKb6dgOydXFcAGjPz04AdUg&usqp=CAU'
          }
          alt='imagem de perfil'
        />
        <div>
          <strong> Jean Martins </strong>
          <span> Adminstrador</span>
        </div>
      </S.ProfileContainer>

      <S.Toolbar>
        <FiSearch size={18} color='#B8B9BB' onClick={handleSideBar} />
        <Dropdown
          icon={null}
          trigger={
            <FiMoreVertical
              size={18}
              color='#B8B9BB'
              style={{ marginLeft: 8 }}
            />
          }
          floating
          direction={'left'}
        >
          <Dropdown.Menu>
            {options.map((option) => (
              <Dropdown.Item
                key={option.key}
                content={option.text}
                onClick={option.onClick}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </S.Toolbar>
    </S.HeaderContainer>
  )
}

export default Header
