import { Header } from '../../components'
import MwManagerContainer from '../../components/ManagerContainer'
import Tabs from '../../components/Tabs'
import { createRouteTab } from '../../routes'

import Manager from './Manager'
import useJustificationsContext, { JustificationsProvider } from './provider'

const Justifications = createRouteTab(() => {
  const {
    activeTab: [activeTab, setActiveTab],
    managerProps,
  } = useJustificationsContext()

  const tabOptions = [
    {
      label: 'Justificativas',
      component: <Manager id={1} managerProps={{ ...managerProps }} />,
    },
    {
      label: 'Histórico',
      component: <Manager id={2} managerProps={{ ...managerProps }} />,
    },
  ]

  return (
    <MwManagerContainer>
      <Header description='Utilize os campos abaixo para analisar, aprovar ou reprovar as justificativas dadas pelo time.' />
      <Tabs
        options={tabOptions}
        active={{
          active: activeTab,
          setActive: setActiveTab,
        }}
      />
      {tabOptions[activeTab].component}
    </MwManagerContainer>
  )
}, JustificationsProvider)

export default Justifications
