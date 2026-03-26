import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'

import Manager from './Manager'
import useAverageSpeedContext, { AverageSpeedProvider } from './provider'

const AverageSpeed = createRouteTab(() => {
  const { managerProps } = useAverageSpeedContext()
  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar a distância percorrida, tempo de deslocamento e velocidade média do atendimento.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, AverageSpeedProvider)

export default AverageSpeed
