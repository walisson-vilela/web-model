import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'

import Manager from './Manager'
import usePunctualityContext, { PunctualityProvider } from './provider'

const Punctuality = createRouteTab(() => {
  const { managerProps } = usePunctualityContext()
  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar o status de pontualidade dos atendimentos.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, PunctualityProvider)

export default Punctuality
