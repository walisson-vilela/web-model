import { UseState } from '../../../../../screens/interfaces'
import { LevelZeroGroup } from '../interfaces'

export interface WithoutSearchProps {
  list: LevelZeroGroup[]
  selectedState: UseState<number[]>
}
