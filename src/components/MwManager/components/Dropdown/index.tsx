import React, { useEffect, useRef, useState } from 'react'

import * as GlobalStyles from '../../styled'
import Tooltip from '../Tooltip'

import DropdownIcon from './Dropdown'
import List from './List'
import DropdownContext from './context'
import type { DropdownProps, Position } from './interfaces'

const axisPosition = {
  x: (x: string, y: string) => `${x} ${y}` as Position,
  y: (x: string, y: string) => `${y} ${x}` as Position,
}

const Dropdown = (props: DropdownProps) => {
  const { items, loading, axis, occult, children, disabled } = { ...props }

  const center = props.centerCoodinates
    ? {
        x: props.centerCoodinates.x || 50,
        y: props.centerCoodinates.y || 75,
      }
    : {
        x: 50,
        y: 75,
      }

  const [open, setOpen] = useState<boolean>(false)
  const [position, setPosition] = useState<Position>('left bottom')

  const ref = useRef<HTMLDivElement | null>(null)

  const close = (event: MouseEvent) => {
    if (!ref || !ref.current || !document.body.contains(ref.current)) return

    const target = event.target as HTMLElement
    const current = ref.current
    if (!current.contains(target)) setOpen(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', close)
    return () => {
      document.removeEventListener('mousedown', close)
    }
  }, [])

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!open) {
      const target = event.target as HTMLElement

      const width = window.innerWidth
      const height = window.innerHeight
      const { top, left } = target.getBoundingClientRect()

      const x = (left * 100) / width
      const y = (top * 100) / height

      const xDir = x > center.x ? 'left' : 'right'
      const yDir = y > center.y ? 'top' : 'bottom'

      const tmp = axisPosition[axis]
      setPosition(tmp(xDir, yDir))
    }

    setOpen((prev) => !prev)
  }

  return (
    <GlobalStyles.ThemeContainer ref={ref}>
      {(() => {
        const buttonProps: GlobalStyles.StyledTransparentButtonProps = {
          type: 'button',
          onClick: onClick,
          disabled: loading,
          $appearance: !open ? 'opacity' : undefined,
          $occult: occult,
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            ...(props.notAbsolute
              ? {}
              : {
                  position: 'absolute' as const,
                  top: 0,
                  left: 0,
                  height: '100%',
                }),
          },
          children: children || <DropdownIcon />,
        }

        if (disabled === undefined || disabled === false) {
          return <GlobalStyles.TransparentButton {...buttonProps} />
        }

        buttonProps.$appearance = 'disabled'

        if (disabled === true) {
          return <GlobalStyles.TransparentButton {...buttonProps} />
        }

        return (
          <Tooltip on='click' message={disabled.content}>
            <GlobalStyles.TransparentButton {...buttonProps} />
          </Tooltip>
        )
      })()}

      <DropdownContext.Provider value={{ items, open, setOpen, position }}>
        <List />
      </DropdownContext.Provider>
    </GlobalStyles.ThemeContainer>
  )
}

export default Dropdown

/**
 * receber prop axis: x ou y
 * se for x,
 * verificar se o primeiro nome deve ser left ou right, baseado na posicao
 * verificar se o segundo nome deve ser top ou bottom, baseado na posicao
 *
 * se for y,
 * verificar se o primeiro nome deve ser top ou bottom, baseado na posicao
 * verificar se o segundo nome deve ser left ou right, baseado na posicao
 */
