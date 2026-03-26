import React from 'react'

import { Wrapper } from './styles'

interface HeaderProps {
  title?: string | JSX.Element
  description: string | JSX.Element
  borderless?: boolean
  child?: JSX.Element
  style?: React.CSSProperties
  className?: string
}

export const Header = ({
  title,
  description,
  borderless,
  child,
  style,
  className,
}: HeaderProps) => (
  <Wrapper borderless={borderless} style={style} className={className}>
    <div>
      {title && <div>{title}</div>}
      <span>{description}</span>
    </div>

    {child && <div>{child}</div>}
  </Wrapper>
)
