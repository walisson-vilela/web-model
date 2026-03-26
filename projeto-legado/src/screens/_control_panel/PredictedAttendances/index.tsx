import { Header } from '../../../components/Header'
import MwManagerContainer from '../../../components/ManagerContainer'
import Tabs from '../../../components/Tabs'
import { createRouteTab } from '../../../routes'

import ManagerPunctuality from './ManagerPunctuality'
import ManagerStores from './ManagerStores'
import ManagerTeams from './ManagerTeams'
import usePredictedAttendancesContext, {
  PredictedAttendancesProvider,
} from './provider'

const PredictedAttendances = createRouteTab(() => {
  const {
    managerProps,
    activeTab: [activeTab, setActiveTab],
  } = usePredictedAttendancesContext()

  const tabsOptions = [
    {
      label: 'Pontualidade',
      component: <ManagerPunctuality {...managerProps} />,
    },
    {
      label: 'Panorama PDV',
      component: <ManagerStores {...managerProps} />,
    },
    {
      label: 'Panorama Equipe',
      component: <ManagerTeams {...managerProps} />,
    },
  ]

  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar o status dos seus atendimentos.' />

      <Tabs
        options={tabsOptions}
        active={{
          active: activeTab,
          setActive: setActiveTab,
        }}
      />

      {tabsOptions[activeTab].component}
    </MwManagerContainer>
  )
}, PredictedAttendancesProvider)

export default PredictedAttendances
