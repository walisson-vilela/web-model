import { Header } from '../../../components'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import Manager from './Manager'
import useRangeQualityContext, { RangeQualityProvider } from './provider'

const RangeQuality = createRouteTab(() => {
  const { managerProps } = useRangeQualityContext()

  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar o status da qualidade baseado no tempo de atendimento.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, RangeQualityProvider)

export default RangeQuality
