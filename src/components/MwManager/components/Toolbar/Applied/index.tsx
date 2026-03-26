import React, { useEffect, useRef, useState } from 'react'

import { getElementByXPath } from '../../../functions'
import * as GlobalStyles from '../../../styled'
import Tooltip from '../../Tooltip'
import Button from '../Button'

import Menu from './Menu'
import type { AppliedProps } from './interfaces'

export const Applied = (props: AppliedProps) => {
  const { appliedFilters, setAppliedFilters, loading } = { ...props }

  // estado que ira controlar se o menu de filtros aplicados esta aberto ou nao
  const [open, setOpen] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement>(null)

  const close = (event: MouseEvent) => {
    if (
      ref.current instanceof Element &&
      document.body.contains(ref.current) &&
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

  // faz o scroll top quando fecha o dropdown
  useEffect(() => {
    if (open || !ref || !ref.current || !document.body.contains(ref.current)) {
      return
    }

    try {
      const element = getElementByXPath('div[2]/div/div[3]/div', ref.current)
      if (!(element instanceof HTMLElement)) return
      element.scrollTo({ top: 0 })
    } catch (e) {}
  }, [open])

  useEffect(() => {
    if (appliedFilters.length === 0) setOpen(false)
  }, [appliedFilters])

  return (
    <GlobalStyles.ThemeContainer>
      <div ref={ref}>
        <Tooltip
          on='click'
          message='No momento não há nenhum filtro aplicado'
          position='bottom'
          disabled={appliedFilters.length > 0}
        >
          <div>
            <Button
              setOpen={(value) => {
                if (appliedFilters.length > 0) setOpen(value)
              }}
              appearance={appliedFilters.length === 0 ? 'disabled' : undefined}
            >
              <React.Fragment>
                Filtros aplicados ({appliedFilters.length})
              </React.Fragment>
            </Button>
          </div>
        </Tooltip>

        <Menu
          open={open}
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
          loading={loading}
        />
      </div>
    </GlobalStyles.ThemeContainer>
  )
}

export default Applied
