import { useHistory } from 'react-router'

import useHomeContext from '../../../../context'
import { Inbox as Icon } from '../../../../icons'
import { HeaderItemComponent } from '../../../../types'

import * as S from './styles'

const Inbox: HeaderItemComponent = (props) => {
  const { unreadMessages, isLoading, hasMenu } = useHomeContext()
  const loading = isLoading('unreadMessages')

  const history = useHistory()

  const onClick = () => {
    history.push('/main/messages/inbox')
  }

  const { disabled, ...rest } = props

  return (
    <S.Item
      title='Inbox'
      $loading={loading}
      {...(disabled || !hasMenu('main/messages/inbox')
        ? {
            $disabled: true,
          }
        : {
            onClick,
          })}
      {...rest}
    >
      <Icon />

      <S.Bullet children={unreadMessages} />
    </S.Item>
  )
}

export default Inbox
