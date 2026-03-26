import { MwTabs } from '@mw-kit/mw-ui'
import { Toaster } from 'react-hot-toast'

import { Header } from '../../../components/Header'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import useContext, { Provider } from './context'
import tabs from './tabs'

const Home = createRouteTab((props) => {
  const {
    data: { route },
  } = props

  const {
    managerProps,
    activeTab: [activeTab, setActiveTab],
  } = useContext()

  const { description, Component } = tabs[activeTab]

  return (
    <MwManagerContainer>
      <Header description={description} />

      <MwTabs
        options={tabs.map(({ label }) => ({
          label,
          data: {},
        }))}
        active={[activeTab, setActiveTab]}
        internal
        alwaysOpen
      />

      {<Component {...managerProps} route={route} />}
      <Toaster position='bottom-right' />
    </MwManagerContainer>
  )
}, Provider)

export default Home
