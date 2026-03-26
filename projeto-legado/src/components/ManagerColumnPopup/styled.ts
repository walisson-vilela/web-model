import React from 'react'

import styled, { css } from 'styled-components'

export const LoaderContainer = styled.div`
  position: relative;
  width: 3.42857143rem;
  height: 3.42857143rem;
`

interface TriggerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  display?: 'inline' | 'flex' | 'block'
}

export const TriggerContainer = styled.div<TriggerContainerProps>`
  max-width: 100%;
  cursor: pointer;

  ${({ display }) => {
    if (!display) return

    return css`
      display: ${display};
    `
  }}

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    text-decoration: underline;
  }

  div > .popup-field,
  div > .popup-field::before {
    background-color: #111827 !important;
  }

  div > .popup-field,
  div > .popup-field .header,
  div > .popup-field .content {
    color: #fff !important;
  }
`
