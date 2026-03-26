import account from '../../../../../../../assets/icons/menu/account.svg?react'
import audit from '../../../../../../../assets/icons/menu/audit.svg?react'
import birthday from '../../../../../../../assets/icons/menu/birthday.svg?react'
import chat from '../../../../../../../assets/icons/menu/chat.svg?react'
import document from '../../../../../../../assets/icons/menu/document.svg?react'
import download from '../../../../../../../assets/icons/menu/download.svg?react'
import graph from '../../../../../../../assets/icons/menu/graph.svg?react'
import help from '../../../../../../../assets/icons/menu/help.svg?react'
import home from '../../../../../../../assets/icons/menu/home.svg?react'
import image from '../../../../../../../assets/icons/menu/image.svg?react'
import inbox from '../../../../../../../assets/icons/menu/inbox.svg?react'
import language from '../../../../../../../assets/icons/menu/language.svg?react'
import notification from '../../../../../../../assets/icons/menu/notification.svg?react'
import product from '../../../../../../../assets/icons/menu/product.svg?react'
import route from '../../../../../../../assets/icons/menu/route.svg?react'
import setting from '../../../../../../../assets/icons/menu/setting.svg?react'
import store from '../../../../../../../assets/icons/menu/store.svg?react'
import task from '../../../../../../../assets/icons/menu/task.svg?react'
import transfer from '../../../../../../../assets/icons/menu/transfer.svg?react'
import user from '../../../../../../../assets/icons/menu/user.svg?react'
import { isKeyOf } from '../../../../../../../utils/Validators'
import * as T from '../../../../types'

import useProvider from './providers'
import * as S from './styles'

const icons = {
  account,
  chat,
  graph,
  image,
  notification,
  setting,
  transfer,
  audit,
  document,
  help,
  inbox,
  product,
  store,
  user,
  birthday,
  download,
  home,
  language,
  route,
  task,
}

const Icon: React.FunctionComponent<
  {
    item: T.Item
  } & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { item, ...divProps } = props

  const Icon = isKeyOf(icons, item.icon) ? icons[item.icon] : icons.help

  const { loading, bullet } = useProvider(item.id)

  return (
    <S.IconContainer
      className={[
        ...(divProps.className || '').split(' '),
        ...(loading ? ['loading'] : []),
      ].join(' ')}
      {...divProps}
    >
      <Icon />

      <S.Bullet $active={!!bullet} children={bullet} />
    </S.IconContainer>
  )
}

export * from './styles'

export default Icon
