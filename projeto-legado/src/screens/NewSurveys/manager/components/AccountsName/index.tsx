import Bullet from '../../../../../components/Bullet/'
import { status as statusLabel } from '../../label'

import * as S from './styles'

interface AccountNameProps {
  status: string
  action_icon: {
    icon: string
    color: string
  }
  name: string
}

const AccountName = ({ action_icon, name, status }: AccountNameProps) => {
  return (
    <S.Container>
      <Bullet color={statusLabel[status].color} content=' ' />
      <S.Icon color={action_icon.color}>
        <span>{action_icon.icon}</span>
      </S.Icon>
      <S.NameContainer>{name}</S.NameContainer>
    </S.Container>
  )
}

export default AccountName
