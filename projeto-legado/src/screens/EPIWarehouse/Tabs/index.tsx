import { MwTabs } from '@mw-kit/mw-ui'
import { Header } from '../../../components/Header'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import { BASE_PATH, tabOptions, tabs } from './constants'
import useContext, { Provider } from './provider'

const TabsManager = createRouteTab((props) => {
  const {
    data: { route },
  } = props

  const { history } = route
  const { tab, managerProps } = useContext()

  const { grid: Grid } = tabOptions[tab] || {}
  const title = tabOptions[tab]?.title || ''
  if (!Grid) return null

  return (
    <MwManagerContainer>
      <Header description={`Utilize as opções abaixo para cadastrar e gerenciar ${title}.`} />

      <MwTabs
        options={tabOptions.map(({ label }) => ({
          label,
          data: {},
        }))}
        active={[
          tab,
          (i) => {
            const name = tabs[i]
            const pathname = [BASE_PATH, ...(name ? [name] : [])].join('/')
            history.push(pathname)
          },
        ]}
        internal
        alwaysOpen
      />

      <Grid {...managerProps} />
    </MwManagerContainer>
  )
}, Provider)

export { tabOptions } from './constants'
export default TabsManager
