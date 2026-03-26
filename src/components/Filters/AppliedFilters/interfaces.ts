import type React from 'react'

import type { AbsoluteContainerProps } from '../../AbsoluteContainer/interfaces'
import type { ButtonProps } from '../Button/interfaces'
import type { AppliedFilter } from '../interfaces'

export interface Common {
  appliedFilters: [
    AppliedFilter[],
    React.Dispatch<React.SetStateAction<AppliedFilter[]>>,
  ]
  containerProps?: Omit<AbsoluteContainerProps, 'open'>
}

export type AppliedFiltersProps = Common &
  Omit<ButtonProps, 'getContent' | 'gap'>
