import type { AppliedFilter } from '../../../interfaces'
import type { Common, Filter } from '../../interfaces'

export interface SubmenuProps {
  item?: Filter
  close: () => void
  closeParent: () => void
  setAppliedFilters: React.Dispatch<React.SetStateAction<AppliedFilter[]>>
  containerProps?: Common['subContainerProps']
}
