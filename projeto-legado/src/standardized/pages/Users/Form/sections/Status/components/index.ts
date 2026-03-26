import { Form } from '../../../interfaces'

import Active from './Active'
import Inactive from './Inactive'
import Pending from './Pending'
import ScheduledActivation from './ScheduledActivation'
import Temporary from './Temporary'

const Components: { [K in Form['status']]: React.FunctionComponent } = {
  A: Active,
  P: Inactive,
  PC: Pending,
  T: Temporary,
  AP: ScheduledActivation,
}

export default Components
