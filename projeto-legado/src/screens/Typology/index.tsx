import { Header } from '../../components/Header'
import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import Manager from './Manager'
import useTypologyContext, { TypologyProvider } from './provider'

const Typology = createRouteTab(() => {
  const { managerProps } = useTypologyContext()
  return (
    <MwManagerContainer>
      <Header description='Crie e gerencie as Utilize os recursos abaixo para gerenciar os tipos de atuações associados aos PDVstipologias de PDVs' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, TypologyProvider)

export default Typology
