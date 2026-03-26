import React from 'react'

import { MwAppliedFilters, MwFilters, MwGrid } from '@mw-kit/mw-ui'
import { AppliedFilter, Filter } from '@mw-kit/mw-ui/types'

import Dropdown, { DropdownProps } from './components/Dropdown'
import Search, { SearchProps } from './components/Search'

interface ToolbarProps {
  appliedFilters: {
    appliedFilters: [
      AppliedFilter[],
      React.Dispatch<React.SetStateAction<AppliedFilter[]>>,
    ]
  }
  dropdown: DropdownProps
  search: SearchProps
  filters: {
    items: Filter[]
    setAppliedFilters: React.Dispatch<React.SetStateAction<AppliedFilter[]>>
  }
}

const Toolbar = (props: ToolbarProps) => {
  return (
    <MwGrid
      cols={{
        align: {
          content: {
            vertical: 'center',
          },
        },
        bordered: true,
        spacing: 's3',
      }}
      spacing='0'
      style={{
        borderWidth: '0 0 1px 0',
      }}
    >
      <MwGrid.Row>
        <MwGrid.Col width='auto' spacing={{ right: '0' }}>
          <Dropdown {...props.dropdown} />
        </MwGrid.Col>

        <MwGrid.Col spacing='0'>
          <Search {...props.search} />
        </MwGrid.Col>

        <MwGrid.Col width='auto'>
          <MwAppliedFilters {...props.appliedFilters} />
        </MwGrid.Col>

        <MwGrid.Col width='auto' spacingAround>
          <MwFilters {...props.filters} />
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Toolbar
