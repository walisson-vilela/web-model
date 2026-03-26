import React from 'react'

import styled, { css } from 'styled-components'

type HeaderColors = 'blue' | 'white' | 'black'

interface StyledHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: HeaderColors
}

const colors = {
  blue: css`
    background-color: #3455ab !important;
    color: #fff !important;
  `,
  white: css`
    background-color: #fff !important;
    color: #263046 !important;
  `,
  black: css`
    background-color: #fff !important;
    color: #263046 !important;
  `,
}

export const Header = styled.div<StyledHeaderProps>`
  font-size: 18px;
  line-height: 20px;
  font-weight: bold;
  padding: 21px;
  ${(props) => {
    if (!props.color) return css``
    return colors[props.color]
  }}
`

export const Content = styled.div`
  border-style: solid;
  border-color: #dadadb;
  border-width: 1px 0;
  padding: 21px 21px 14px 21px;
`

export const Actions = styled.div`
  padding: 14px;
  display: flex;

  > div {
    display: flex;
    gap: 14px;

    :first-child {
      flex: 1;
    }
    :last-child {
      justify-content: end;
      align-items: center;
    }
  }
`
