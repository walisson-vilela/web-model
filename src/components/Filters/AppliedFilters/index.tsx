import React from 'react'

import { filterObject } from '../../../functions/formatters'
import Button from '../Button'
import type { ButtonProps } from '../Button/interfaces'

import AppliedFiltersMenu from './components/Menu'
import type { AppliedFiltersProps } from './interfaces'

const AppliedFilters = Object.assign(
  (props: AppliedFiltersProps) => {
    const { appliedFilters, containerProps } = props

    const buttonProps = filterObject<
      AppliedFiltersProps,
      Omit<ButtonProps, 'getContent' | 'gap'>
    >(props, ['appliedFilters'])

    return (
      <Button
        {...buttonProps}
        gap='s1'
        getContent={(open, close) => (
          <AppliedFiltersMenu
            {...{ open, close, appliedFilters, containerProps }}
          />
        )}
      >
        Filtros Aplicados ({appliedFilters[0].length})
      </Button>
    )
  },
  { Menu: AppliedFiltersMenu },
)

export default AppliedFilters
