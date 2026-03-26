import { TUseContentSelected } from '../../../../../../components/GridSelector/interfaces'
import { AssociatedUser } from '../types'

export const identify: ReturnType<
  TUseContentSelected<AssociatedUser>
>['gridSelector']['identify'] = (x, y) => x.person_id === y.person_id
