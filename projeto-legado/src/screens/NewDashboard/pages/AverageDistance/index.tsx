import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'

import Manager from './Manager'
import useAverageDistanceContext, { AverageDistanceProvider } from './provider'

const AverageDistance = createRouteTab(() => {
  const { managerProps } = useAverageDistanceContext()
  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar o planejamento do atendimento, ações pontuais e o impacto desses na distância média percorrida.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, AverageDistanceProvider)

export default AverageDistance
