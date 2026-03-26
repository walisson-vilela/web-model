import { Header } from '../../../components/Header'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import Manager from './Manager'
import useRoadmapCoverageContext, { RoadmapCoverageProvider } from './provider'

const RoadmapCoverage = createRouteTab(() => {
  const { managerProps } = useRoadmapCoverageContext()

  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar o status dos colaboradores' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, RoadmapCoverageProvider)

export default RoadmapCoverage
