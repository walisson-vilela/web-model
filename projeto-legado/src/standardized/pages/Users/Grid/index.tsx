import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'

import Manager from './Manager'
import useContext, { Provider } from './provider'

const Grid = createRouteTab((props) => {
  const { managerProps } = useContext()

  return (
    <MwManagerContainer>
      <Header description='Utilize os campos abaixo para estabelecer as configurações' />

      <Manager {...managerProps} route={props.data.route} />
    </MwManagerContainer>
  )
}, Provider)

export default Grid
