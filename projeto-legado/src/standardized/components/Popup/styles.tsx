import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

const Container = styled.div`
  overflow: hidden;
  width: min-content;
  max-width: 100%;

  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`

export const TriggerContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { ellipsis?: boolean }
>((props, ref) => {
  const divProps = { ...props }
  delete divProps.ellipsis

  return (
    <Container
      {...divProps}
      ref={ref}
      children={
        props.ellipsis !== false ? (
          <MwEllipsisContainer children={props.children} />
        ) : (
          props.children
        )
      }
    />
  )
})

TriggerContainer.displayName = 'TriggerContainer'
