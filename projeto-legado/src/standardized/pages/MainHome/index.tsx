import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import CardsGrid from './components/CardsGrid'
import FiltersBar from './components/FiltersBar'
import { CARD_LAYOUT } from './constants'
import { MainHomeProvider } from './context'

const MainHome = createRouteTab((props) => {
  const route = props?.data?.route

  if (!route) return null

  const { history, match } = route

  const handleOpenDetail = (cardId: string) => {
    const base = match.url
      .replace(/\/dashboard-home\/[^/]+$/, '')
      .replace(/\/$/, '')
    history.push(`${base}/dashboard-home/${cardId}`)
  }

  return (
    <MainHomeProvider>
      <MwManagerContainer>
        <FiltersBar />
        <CardsGrid layout={CARD_LAYOUT} onOpenDetail={handleOpenDetail} />
      </MwManagerContainer>
    </MainHomeProvider>
  )
})

export default MainHome
