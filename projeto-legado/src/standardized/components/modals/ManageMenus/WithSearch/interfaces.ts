import { SortState } from '@mw-kit/mw-manager'

import { UseState } from '../../../../../screens/interfaces'
import { LevelZeroGroup } from '../interfaces'

export interface WithSearchProps {
  list: LevelZeroGroup[]
  selectedState: UseState<number[]>
  sortState: UseState<SortState | null>
}
