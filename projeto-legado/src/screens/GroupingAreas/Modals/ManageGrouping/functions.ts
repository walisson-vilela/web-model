import { IdentifyFunc } from '../../../../components/GridSelector/interfaces'

import { Selected } from './interface'

export const identify: IdentifyFunc<Selected[number]> = (x, y) =>
  x.foreign_id === y.foreign_id
