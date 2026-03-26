import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import Tabs from '../../../../components/Tabs'
import { createRouteTab } from '../../../../routes'

import ManagerPDVs from './ManagerPDVs'
import ManagerTeams from './ManagerTeams'
import useServicePerformanceContext, {
  ServicePerformanceProvider,
} from './provider'

const ServicePerformance = createRouteTab(() => {
  const {
    activeTab: [activeTab, setActiveTab],
    managerProps,
  } = useServicePerformanceContext()

  const tabs = [
    { label: 'PDVs', component: <ManagerPDVs {...managerProps} /> },
    { label: 'Equipes', component: <ManagerTeams {...managerProps} /> },
  ]

  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar a performance de atendimento na visão PDV e Executores.' />
      <Tabs
        options={tabs}
        active={{
          active: activeTab,
          setActive: setActiveTab,
        }}
      />

      {tabs[activeTab].component}
    </MwManagerContainer>
  )
}, ServicePerformanceProvider)

export default ServicePerformance
