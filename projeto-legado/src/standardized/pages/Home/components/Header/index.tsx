import DisabledPopup from '../DisabledPopup'

import * as Items from './items'
import * as S from './styles'

const Header = () => {
  return (
    <S.Container>
      <div>
        <img src='/assets/images/giv-logo.svg' alt='Giv' />
      </div>

      <DisabledPopup offset={[-7, 0]} trigger={Items.Language} />

      <DisabledPopup offset={[-7, 0]} trigger={Items.Help} />

      <DisabledPopup offset={[-7, 0]} trigger={Items.Chat} />

      <DisabledPopup offset={[-7, 0]} trigger={Items.Inbox} />

      <DisabledPopup offset={[7, 0]} trigger={Items.Notifications} />

      <DisabledPopup offset={[7, 0]} trigger={Items.Birthdays} />

      <DisabledPopup offset={[-7, 0]} trigger={Items.User} />
    </S.Container>
  )
}

export default Header
