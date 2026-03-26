import { EllipsisContainer } from '@mw-kit/mw-manager'

import useEventManagerContext from '../../context'
import filters from '../../filters'
import { downloadEventData } from '../../services'
import Toolbar from '../Toolbar'

import Details from './components/Details'

const Grid = () => {
  const {
    search: [search, setSearch],
    appliedFilters: [appliedFilters, setAppliedFilters],
    pagination: [{ page }],
    user_id,
    mode,
  } = useEventManagerContext()

  return (
    <div
      style={{
        height: '325px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Toolbar
        dropdown={{
          options: [
            {
              label: <EllipsisContainer>Extrair dados</EllipsisContainer>,
              onClick: () =>
                downloadEventData(user_id, mode, appliedFilters, search),
              data: {},
            },
          ],
        }}
        search={{
          search: [search, setSearch],
        }}
        appliedFilters={{
          appliedFilters: [appliedFilters, setAppliedFilters],
        }}
        filters={{
          items: filters,
          setAppliedFilters,
        }}
      />{' '}
      <Details />
    </div>
  )
}

export default Grid
