import React from 'react'

import { MwIcon } from '@mw-kit/mw-ui'
import styled, { css } from 'styled-components'

const Container = styled.div<{ open: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  text-transform: capitalize;
  align-items: center;
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}

  > :nth-last-child(-n+1) {
    transform: rotate(${({ open }) => (open ? 90 : 0)}deg);
    transition: transform 0.5s ease-in-out;
  }
`

const CaretContainer = (
  props: React.HTMLAttributes<HTMLDivElement> & { open: boolean },
) => {
  return (
    <Container {...props}>
      {props.children}
      <MwIcon
        type='semantic'
        icon={'caret right'}
        width='14px'
        height='14px'
        color='silver'
      />
    </Container>
  )
}

export default CaretContainer
