import { TUseContentSelected } from '../../../../../../../../components/GridSelector/interfaces'
import { AssociatedGroup } from '../../../types'

export const identify: ReturnType<
  TUseContentSelected<AssociatedGroup>
>['gridSelector']['identify'] = (x, y) =>
  x.subcontractor_id === y.subcontractor_id
