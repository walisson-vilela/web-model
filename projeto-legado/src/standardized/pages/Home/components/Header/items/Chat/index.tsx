import { Chat as Icon } from '../../../../icons'
import { HeaderItemComponent } from '../../../../types'

import * as S from './styles'

const Chat: HeaderItemComponent = (props) => {
  const { disabled, ...rest } = props

  return (
    <S.Item title='Chat' $disabled {...rest}>
      <Icon />
    </S.Item>
  )
}

export default Chat
