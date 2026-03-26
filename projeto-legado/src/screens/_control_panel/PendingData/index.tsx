import { Header } from '../../../components/Header'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import Manager from './Manager'
import usePendingDataContext, { PendingDataProvider } from './provider'

const PendingData = createRouteTab(() => {
  const { managerProps } = usePendingDataContext()
  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar os usuários nesta condição.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, PendingDataProvider)

export default PendingData
