import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'

import Manager from './Manager'
import useFlagContext, { FlagProvider } from './provider'

const Flag = createRouteTab(() => {
  const { managerProps } = useFlagContext()
  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar a representação da bandeira e a contribuição da mesma para a performance do atendimento na semana.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, FlagProvider)

export default Flag
