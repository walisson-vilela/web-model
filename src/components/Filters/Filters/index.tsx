import React from 'react'

import { filterObject } from '../../../functions/formatters'
import Button from '../Button'
import type { ButtonProps } from '../Button/interfaces'

import FiltersMenu from './components/Menu'
import type { FiltersProps } from './interfaces'

const Filters = Object.assign(
  (props: FiltersProps) => {
    const { items, setAppliedFilters, containerProps, subContainerProps } =
      props

    const buttonProps = filterObject<
      FiltersProps,
      Omit<ButtonProps, 'getContent' | 'gap'>
    >(props, ['items', 'setAppliedFilters'])

    return (
      <Button
        {...buttonProps}
        gap='s4'
        getContent={(open, close) => (
          <FiltersMenu
            {...{
              open,
              close,
              setAppliedFilters,
              items,
              containerProps,
              subContainerProps,
            }}
          />
        )}
      >
        Filtros
      </Button>
    )
  },
  { Menu: FiltersMenu },
)

export default Filters
