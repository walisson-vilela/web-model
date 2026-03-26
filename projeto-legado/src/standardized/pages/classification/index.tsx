import { Header } from '../../../components/Header'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import Manager from './Manager'
import useClassificationContext, { ClassificationProvider } from './provider'

const Classification = createRouteTab(() => {
  const { managerProps } = useClassificationContext()

  return (
    <MwManagerContainer>
      <Header description='Utilize os campos abaixo para cadastrar os motivos a serem justificados, atrelado ao cenário e listar as classificações.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, ClassificationProvider)

export default Classification
