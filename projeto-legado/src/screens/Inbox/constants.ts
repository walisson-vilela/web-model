import * as Components from './components'
import * as Types from './types'

export const BASE_PATH = '/main/messages/inbox'

export const tabs: {
  [key in Types.Tab]: Types.TabComponent
} = {
  '': Components.Grid,
  view: Components.View,
  new: Components.Form,
  reply: Components.Form,
  'reply-all': Components.Form,
  forward: Components.Form,
  sent: Components.Grid,
  important: Components.Grid,
}
