import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'

import Manager from './Manager'
import useXRayTMOContext, { XRayTMOProvider } from './provider'

const XRayTMO = createRouteTab(() => {
  const { managerProps } = useXRayTMOContext()

  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar se o planejamento dos roteiros estão coerentes com a jornada de trabalho do time de execução.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, XRayTMOProvider)

export default XRayTMO
