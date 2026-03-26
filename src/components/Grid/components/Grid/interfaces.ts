import type React from 'react'

import type { SpacingOrZero, Spacings } from '../../../../interfaces'
import type { BaseColProps } from '../Col/interfaces'
import type { BaseRowProps } from '../Row/interfaces'

export interface BaseGridProps {
  spacing?: SpacingOrZero | Spacings
}

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseGridProps {
  rows?: BaseRowProps
  cols?: BaseColProps
  borderless?: true
}

export type StyledGridProps = {
  $spacing?: GridProps['spacing']
  $borderless?: GridProps['borderless']
}

export interface ContextInterface {
  rows: BaseRowProps
  cols: BaseColProps
}
