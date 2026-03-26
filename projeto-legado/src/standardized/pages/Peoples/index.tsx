import { Header } from '../../../components/Header'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import Manager from './Manager'
import useContext, { Provider } from './provider'

const Peoples = createRouteTab((props) => {
  const {
    data: { route },
  } = props

  const { managerProps } = useContext()

  return (
    <MwManagerContainer>
      <Header description='Utilize os campos abaixo para fazer o controle de seus cadastros.' />

      <Manager {...managerProps} route={route} />
    </MwManagerContainer>
  )
}, Provider)

export default Peoples
