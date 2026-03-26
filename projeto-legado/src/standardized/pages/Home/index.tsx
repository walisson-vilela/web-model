import { RouteComponentProps } from 'react-router'
import { SemanticToastContainer } from 'react-semantic-toasts'

import { TabsProvider } from '../../../routes'
import MainRoutes from '../../../routes/MainRoutes'
import { WebSocketProvider } from '../../../utils/hooks'

import { Header, Menu } from './components'
import { HomeProvider } from './context'
import * as S from './styles'

const Home = (props: RouteComponentProps) => {
  const { match, history, location } = props

  return (
    <WebSocketProvider>
      <TabsProvider location={location} history={history} match={match}>
        <HomeProvider>
          <S.Container>
            <Menu />

            <S.Body>
              <Header />

              <S.Content>
                <MainRoutes />
              </S.Content>
            </S.Body>
          </S.Container>
        </HomeProvider>

        <SemanticToastContainer
          animation={'fade up'}
          position={'bottom-left'}
        />
      </TabsProvider>
    </WebSocketProvider>
  )
}

export default Home
