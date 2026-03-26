import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'

import Manager from './Manager'
import useTypologyContext, { TypologyProvider } from './provider'

const Typology = createRouteTab(() => {
  const { managerProps } = useTypologyContext()
  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar a representação da tipologia e a contribuição da mesma para a performance do atendimento na semana.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, TypologyProvider)

export default Typology
