import { Toaster } from 'react-hot-toast'

import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'

import BaseStoresManager from './Manager'
import useContext, { Provider } from './provider'

const BaseStores = createRouteTab((props) => {
  const {
    managerProps,
    showUpdated: [showUpdated, setShowUpdated],
  } = useContext()

  return (
    <MwManagerContainer>
      <Header description='Gerencie os seus Pontos de Atendimento.' />

      <BaseStoresManager
        {...managerProps}
        showUpdated={[showUpdated, setShowUpdated]}
        route={props.data.route}
      />

      <Toaster position='bottom-right' />
    </MwManagerContainer>
  )
}, Provider)

export default BaseStores
