import { Header } from '../../../components/Header'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import Manager from './Manager'
import useBatteryLevelContext, { BatteryLevelProvider } from './provider'

const BatteryLevel = createRouteTab(() => {
  const { managerProps } = useBatteryLevelContext()
  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar o status de consumo da bateria.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, BatteryLevelProvider)

export default BatteryLevel
