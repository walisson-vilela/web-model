import { Header } from '../../../components/Header'
import MwManagerContainer from '../../../components/ManagerContainer'
import { createRouteTab } from '../../../routes'

import Manager from './Manager'
import useNotStartedAttendancesContext, {
  NotStartedAttendancesProvider,
} from './provider'

const NotStartedAttendances = createRouteTab(() => {
  const { managerProps } = useNotStartedAttendancesContext()
  return (
    <MwManagerContainer>
      <Header description='Utilize a lista abaixo para identificar os colaboradores.' />

      <Manager {...managerProps} />
    </MwManagerContainer>
  )
}, NotStartedAttendancesProvider)

export default NotStartedAttendances
