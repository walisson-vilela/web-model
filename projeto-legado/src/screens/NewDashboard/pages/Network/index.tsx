import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'

import Manager from './Manager'
import useNetworkContext, { NetworkProvider } from './provider'

const Network = createRouteTab(() => {
  const { managerProps } = useNetworkContext()
  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar a representação da rede e a contribuição da mesma para a performance do atendimento na semana.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, NetworkProvider)

export default Network
