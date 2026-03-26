import { MwTabs } from '@mw-kit/mw-ui'

import { Header } from '../../components/Header'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import ManagerSegments from './ManagerSegments'
import ManagerTime from './ManagerTime'
import useSegmentsContext, { SegmentsProvider } from './provider'

const Segments = createRouteTab(
  () => {
    const {
      activeTab: [activeTab, setActiveTab],
      managerProps,
    } = useSegmentsContext()
    const tabsOptions = [
      {
        label: 'Gerenciar Canais',
        component: <ManagerSegments {...managerProps} />,
      },
      {
        label: 'Tempo por Canal',
        component: <ManagerTime {...managerProps} />,
      },
    ]

    return (
      <MwManagerContainer>
        <Header description='Crie e gerencie os canais de venda e defina o tempo de atendimento.' />

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
  },

  SegmentsProvider,
)

export default Segments
