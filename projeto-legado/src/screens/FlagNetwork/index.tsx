import { MwTabs } from '@mw-kit/mw-ui'

import { Header } from '../../components'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import FlagManager from './FlagManager'
import GroupManager from './GroupManager'
import NetworkManager from './NetworkManager'
import useFlagNetworkContext, { FlagNetworkProvider } from './provider'

const FlagNetwork = createRouteTab(() => {
  const {
    managerProps,
    activeTab: [activeTab, setActiveTab],
  } = useFlagNetworkContext()

  const tabsOptions = [
    { label: 'Grupos', component: <GroupManager {...managerProps} /> },
    { label: 'Redes', component: <NetworkManager {...managerProps} /> },
    { label: 'Bandeiras', component: <FlagManager {...managerProps} /> },
  ]

  return (
    <MwManagerContainer>
      <Header description='Gerencie a hierarquia do PDV referente a grupos, redes e bandeiras.' />

      <MwTabs
        options={tabsOptions.map((e) => ({
          label: e.label,
          data: { ...e },
        }))}
        active={[activeTab, setActiveTab]}
        internal
        alwaysOpen
      />

      {tabsOptions[activeTab].component}
    </MwManagerContainer>
  )
}, FlagNetworkProvider)

export default FlagNetwork
