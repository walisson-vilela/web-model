import { Header } from '../../components'
import { createRouteTab } from '../../routes'

import * as Components from './components'
import { tabs } from './constants'
import { useTabNavigationProps } from './hooks'
import Provider from './provider'
import * as Styles from './styles'

const Inbox = createRouteTab<{ tab: string; id: string }>((props) => {
  const navigationProps = useTabNavigationProps(props.data.route)

  const Tab = tabs[navigationProps.tab]

  return (
    <Styles.Container>
      <Header description='Gerencie suas mensagens enviadas e recebidas.' />

      <Styles.TabsContainer currentTab={navigationProps.tab}>
        <Components.Tabs {...navigationProps} />

        <Tab {...navigationProps} />
      </Styles.TabsContainer>
    </Styles.Container>
  )
}, Provider)

export default Inbox
