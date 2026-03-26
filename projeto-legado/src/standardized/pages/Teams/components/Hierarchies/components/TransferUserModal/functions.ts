import { IdentifyFunc } from '../../../../../../../components/GridSelector/interfaces'

import { HierarchyUser } from './types'

export const identify: IdentifyFunc<HierarchyUser> = (x, y) =>
  x.user.id === y.user.id
