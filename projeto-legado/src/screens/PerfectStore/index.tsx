import { Header } from '../../components/Header'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import Filters from './Filters'
import Manager from './Manager'
import usePerfectStorContext, { PerfectStoreProvider } from './provider'

const PerfectStore = createRouteTab(() => {
  const {
    managerProps,
    filters: [filters, setFilters],
  } = usePerfectStorContext()

  return (
    <MwManagerContainer>
      <Header
        description='Utilize os botões abaixo filtrar os relatórios de loja perfeita.'
        style={{ marginBottom: 0 }}
      />

      <Filters filtersState={[filters, setFilters]} />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, PerfectStoreProvider)

export default PerfectStore
