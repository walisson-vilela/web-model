import { createRouteTab } from '../../routes'

import TabsManager from './Tabs'

const EPIWarehouse = createRouteTab(
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

export default EPIWarehouse
