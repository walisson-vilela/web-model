import { Header } from '../../components/Header'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import Manager from './Manager'
import useDistributionCentersContext, {
  DistributionCentersProvider,
} from './provider'

const DistributionCenters = createRouteTab(() => {
  const { managerProps } = useDistributionCentersContext()

  return (
    <MwManagerContainer>
      <Header description='Gerencie as informações das Centrais e suas particularidades de rateio aos PDVs associados.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, DistributionCentersProvider)

export default DistributionCenters
