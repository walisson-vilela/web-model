import { Header } from '../../../components'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import Manager from './Manager'
import useJustificationsContext, { JustificationsProvider } from './provider'

const Justifications = createRouteTab(() => {
  const { managerProps } = useJustificationsContext()
  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar as justificavas reportadas pela equipe.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, JustificationsProvider)

export default Justifications
