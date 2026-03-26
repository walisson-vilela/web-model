import { createRouteTab } from '../../routes'

import TabsManager from './Tabs'

const EPIManagement = createRouteTab(
  (props) => {
    return (
      <>
        <TabsManager {...props} />
      </>
    )
  },
  (props) => {
    return (
      <>
        <TabsManager.provider {...props} />
      </>

    )
  },
)

export default EPIManagement
