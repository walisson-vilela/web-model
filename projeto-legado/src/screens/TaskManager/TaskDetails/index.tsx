import styled from 'styled-components'
import { Header } from '../../../components'
import MwManagerContainer from '../../../components/ManagerContainer'
import Tabs from '../../../components/Tabs'
import { createRouteTab } from '../../../routes'

import HeaderContent, { ItemProps } from './components/HeaderContent'
import useTaskDetailContext, { TaskDetailProvider } from './provider'
import ExecutorManager from './tabs/ExecutorManager'
import FormManager from './tabs/FormManager'
import OccupationManager from './tabs/OccupationManager'
import StoreManager from './tabs/StoreManager'

const TitleLine = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: baseline;
`

const TitleMain = styled.span`
  text-transform: uppercase;
`

const TitleMetric = styled.span`
  font-weight: 600;
`

const tabsOptions = [
  { label: 'PDVs', component: StoreManager },
  {
    label: 'Executores',
    component: ExecutorManager,
  },
  {
    label: 'Formulários',
    component: FormManager,
  },
  {
    label: 'Área de Atuação',
    component: OccupationManager,
  },
]

const TaskDetails = createRouteTab((props) => {
  const {
    activeTab: [activeTab, setActiveTab],
    managerProps,
  } = useTaskDetailContext()

  const params = new URLSearchParams(props.data.route.location.search)

  const headerItems: ItemProps[] = [
    { label: 'PDVs', value: 500 },
    { label: 'Áreas', value: 15 },
    { label: 'Executores', value: 180 },
    { label: 'Linha Prod.', value: 5 },
    { label: 'SKUs', value: 10 },
  ]

  const Component = tabsOptions[activeTab].component

  return (
    <MwManagerContainer>
      <Header
        title={
          <TitleLine>
            <TitleMain>{params.get('title') || '-'}</TitleMain>
            <TitleMetric>Realizado (85,2%)</TitleMetric>
            <TitleMetric>Alcance (98,2%)</TitleMetric>
          </TitleLine>
        }
        description={params.get('description') || '-'}
        child={
          <HeaderContent items={headerItems} style={{ paddingRight: 56 }} />
        }
      />

      <Tabs
        options={tabsOptions}
        active={{
          active: activeTab,
          setActive: setActiveTab,
        }}
      />

      <Component {...managerProps} />
    </MwManagerContainer>
  )
}, TaskDetailProvider)

export default TaskDetails
