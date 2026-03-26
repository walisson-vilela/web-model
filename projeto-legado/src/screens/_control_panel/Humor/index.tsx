import { Header } from '../../../components'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import Manager from './Manager'
import useHumorContext, { HumorProvider } from './provider'

const Humor = createRouteTab(() => {
  const { managerProps } = useHumorContext()

  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar o humor de sua equipe.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, HumorProvider)

export default Humor
