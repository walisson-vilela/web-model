import { Header } from '../../../components/Header'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import Manager from './Manager'
import useDisconnectedUsersContext, {
  DisconnectedUsersProvider,
} from './provider'

const DisconnectedUsers = createRouteTab(() => {
  const { managerProps } = useDisconnectedUsersContext()

  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar os usuários desconectados.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, DisconnectedUsersProvider)

export default DisconnectedUsers
