import { createRouteTab } from '../../../routes'
import { getToken } from '../../../utils'

import TabsManager, { tabOptions } from './Tabs'
import { TYPE_GROUP, TYPE_MASTER } from './constants'

const Contractors = createRouteTab(
  (props) => {
    const token = getToken()

    if (token.payload.type === TYPE_MASTER) {
      return <TabsManager {...props} />
    }

    const { form: Form } = tabOptions[token.payload.type === TYPE_GROUP ? 1 : 0]

    return <Form {...props} />
  },
  (props) => {
    const token = getToken()

    if (token.payload.type === TYPE_MASTER) {
      return TabsManager.provider ? <TabsManager.provider {...props} /> : null
    }

    const { form: Form } = tabOptions[token.payload.type === TYPE_GROUP ? 1 : 0]

    return Form.provider ? <Form.provider {...props} /> : null
  },
)

export default Contractors
