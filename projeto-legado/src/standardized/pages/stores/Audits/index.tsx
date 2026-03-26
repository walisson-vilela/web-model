import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'

import Manager from './Manager'
import useAuditsContext, { AuditsProvider } from './provider'

const StoreAudits = createRouteTab(() => {
  const { managerProps } = useAuditsContext()

  return (
    <MwManagerContainer>
      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, AuditsProvider)

export default StoreAudits
