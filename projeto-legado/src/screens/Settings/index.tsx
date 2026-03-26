import { AppliedFilters, MenuFilters, SearchFilter } from '@mw-kit/mw-manager'
import { MwTabs } from '@mw-kit/mw-ui'

import { Header } from '../../components'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import Manager from './Manager'
import filters from './filters'
import useContext, { Provider } from './provider'
import * as S from './styles'

const tabs: {
  label: string
  tab: 'web' | 'mobile'
}[] = [
  { label: 'Web', tab: 'web' },
  { label: 'Mobile', tab: 'mobile' },
]

const Settings = createRouteTab(() => {
  const {
    managerProps,
    activeTab: [activeTab, setActiveTab],
  } = useContext()

  return (
    <MwManagerContainer>
      <Header
        description='Utilize as opções abaixo para estabelecer regras e parâmetros do sistema.'
        child={
          <S.FiltersContainer>
            <SearchFilter transparent {...managerProps.search} />
            <AppliedFilters {...managerProps.appliedFilters} />
            <MenuFilters {...{ filters, ...managerProps.appliedFilters }} />
          </S.FiltersContainer>
        }
      />

      <MwTabs
        options={[
          {
            label: 'Web',
            data: {},
          },
          {
            label: 'Mobile',
            data: {},
          },
        ]}
        active={[activeTab, setActiveTab]}
        alwaysOpen
        internal
      />

      <Manager {...managerProps} {...tabs[activeTab]} />
    </MwManagerContainer>
  )
}, Provider)

export default Settings
