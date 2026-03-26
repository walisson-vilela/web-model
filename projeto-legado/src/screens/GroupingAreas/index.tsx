import { MwLoader, MwTabs } from '@mw-kit/mw-ui'
import { Toaster } from 'react-hot-toast'

import { Header } from '../../components/Header'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import useGroupingAreasContext, { GroupingAreasProvider } from './provider'
import Component from './tabs'

const GroupingAreas = createRouteTab(() => {
  const {
    loading: [loading],
    activeTab: [activeTab, setActiveTab],
    hierarchies,
    managerProps,
  } = useGroupingAreasContext()

  return (
    <MwManagerContainer>
      {loading && <MwLoader filled />}

      <Header description='Crie e gerencie agrupamentos de áreas de atuação.' />

      {loading ? (
        <MwLoader />
      ) : hierarchies.length > 0 ? (
        <>
          <MwTabs
            options={hierarchies.map((e) => ({
              label: e.label,

              data: { ...e },
            }))}
            active={[activeTab, setActiveTab]}
            internal
            alwaysOpen
          />
          <Component
            {...managerProps}
            hierarchy_id={hierarchies[activeTab].hierarchy_id}
          />
        </>
      ) : (
        <span>Dados não encontrados!</span>
      )}

      <Toaster position='bottom-right' />
    </MwManagerContainer>
  )
}, GroupingAreasProvider)

export default GroupingAreas
