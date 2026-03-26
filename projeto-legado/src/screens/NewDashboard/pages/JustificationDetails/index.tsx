import { Header } from '../../../../components/Header'
import MwManagerContainer from '../../../../components/ManagerContainer'
import { createRouteTab } from '../../../../routes'

import Manager from './Manager'
import useJustificationDetailsContext, {
  JustificationDetailsProvider,
} from './provider'

const JustificationDetails = createRouteTab(() => {
  const { managerProps } = useJustificationDetailsContext()
  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar as justificavas reportadas pela equipe.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, JustificationDetailsProvider)

export default JustificationDetails
