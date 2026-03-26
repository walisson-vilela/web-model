import type { Common } from '../../interfaces'

export interface FiltersMenuProps extends Common {
  open: boolean
  close: () => void
}
