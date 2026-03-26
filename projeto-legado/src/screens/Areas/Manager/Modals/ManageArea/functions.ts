import { IdentifyFunc } from '../../../../../components/GridSelector/interfaces'

import { Common } from './interface'

export const identify: IdentifyFunc<Common> = (x, y) =>
  x.foreign_id === y.foreign_id
