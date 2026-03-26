import { Header } from '../../../components/Header'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import Manager from './Manager'
import useRolesContext, { RolesProvider } from './provider'

const Roles = createRouteTab(() => {
  const { managerProps } = useRolesContext()

  return (
    <MwManagerContainer>
      <Header description='Utilize os campos abaixo para gerenciar ou atribuir novas funções.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, RolesProvider)

export default Roles
