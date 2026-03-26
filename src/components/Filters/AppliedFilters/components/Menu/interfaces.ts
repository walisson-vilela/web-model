import type { Common } from '../../interfaces'

export interface AppliedFiltersMenuProps extends Common {
  open: boolean
  close: () => void
}
