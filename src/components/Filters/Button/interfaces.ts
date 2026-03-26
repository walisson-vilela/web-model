import type React from 'react'

import type { SpacingOrZero } from '../../../interfaces'

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: true
  getContent: (open: boolean, close: () => void) => JSX.Element
  gap: SpacingOrZero
}
