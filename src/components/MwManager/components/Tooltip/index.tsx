import React, { useEffect, useRef, useState } from 'react'

import * as S from './styled'

interface TooltipProps {
  /** elemento que tera a tooltip */
  children: JSX.Element
  /** mensagem da tooltip */
  message: JSX.Element | string
  /** evento que ira mostrar a tooltip */
  on: 'click' | 'hover'
  /** estado que habilita ou desabilita a tooltip */
  disabled?: boolean

  /** largura da tooltip */
  width?: 'large' | 'medium' | 'small'
  /** posicao da tooltip */
  position?: 'top' | 'left' | 'bottom' | 'right'
}

const Tooltip = (props: TooltipProps) => {
  const { children, message, on, disabled, width, position } = { ...props }

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement>(null)

  let onClick: React.MouseEventHandler<HTMLDivElement> = () => {}
  let onMouseOver: React.MouseEventHandler<HTMLDivElement> = () => {}
  let onMouseOut: React.MouseEventHandler<HTMLDivElement> = () => {}

  const open = () => {
    if (disabled) return
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const onClickOut = (event: MouseEvent) => {
    if (!ref || !ref.current || !document.body.contains(ref.current)) return

    const target = event.target as HTMLElement
    if (!ref.current.contains(target)) setIsOpen(false)
  }

  if (on === 'click') onClick = open
  else if (on === 'hover') {
    onMouseOver = open
    onMouseOut = close
  }

  useEffect(() => {
    setIsOpen(false)
  }, [on])

  useEffect(() => {
    if (disabled) setIsOpen(false)
  }, [disabled])

  useEffect(() => {
    document.addEventListener('mousedown', onClickOut)

    return () => {
      document.removeEventListener('mousedown', onClickOut)
    }
  }, [])

  return (
    <S.Container
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      ref={ref}
    >
      {children}
      {isOpen && !disabled && (
        <S.Tooltip $width={width} $position={position}>
          {message}
        </S.Tooltip>
      )}
    </S.Container>
  )
}

export default Tooltip
