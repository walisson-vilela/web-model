import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'

import Manager from './Manager'
import useContext, { Provider } from './provider'

const StoresHome = createRouteTab((props) => {
  const {
    data: { route },
  } = props

  const { managerProps } = useContext()

  return (
    <MwManagerContainer>
      <Header description='Gerencie os seus Pontos de Atendimento.' />

      <Manager {...managerProps} route={route} />
    </MwManagerContainer>
  )
}, Provider)

export default StoresHome
