import React, { useEffect, useRef, useState } from 'react'

import * as GlobalStyles from '../../../styled'
import Button from '../Button'

import List from './List'
import type { MenuProps } from './interfaces'

const Menu = (props: MenuProps) => {
  const { filters, appliedFilters, setAppliedFilters, loading, bottomMargin } =
    { ...props }

  const [open, setOpen] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement>(null)

  const close = (event: MouseEvent) => {
    if (
      ref.current instanceof Element &&
      document.body.contains(event.target as HTMLElement) &&
      !ref.current.contains(event.target as HTMLElement)
    ) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', close)
    return () => {
      document.removeEventListener('mousedown', close)
    }
  }, [])

  return (
    <GlobalStyles.ThemeContainer>
      <div ref={ref}>
        <Button setOpen={setOpen} disabled={filters.length === 0}>
          Filtros
        </Button>
        <List
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
          filters={filters}
          loading={loading}
          open={open}
          setOpen={setOpen}
          bottomMargin={bottomMargin}
        />
      </div>
    </GlobalStyles.ThemeContainer>
  )
}

export default Menu
