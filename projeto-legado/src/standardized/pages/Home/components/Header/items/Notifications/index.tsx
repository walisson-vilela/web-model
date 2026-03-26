import { Notification as Icon } from '../../../../icons'
import { HeaderItemComponent } from '../../../../types'

import * as S from './styles'

const Notifications: HeaderItemComponent = (props) => {
  const { disabled, ...rest } = props

  return (
    <S.Item title='Notificações' $disabled {...rest}>
      <Icon />
    </S.Item>
  )
}

export default Notifications
