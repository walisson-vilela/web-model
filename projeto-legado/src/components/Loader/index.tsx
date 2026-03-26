import React from 'react'

import * as L from './styles'

interface LoaderProps {
  absolute?: boolean
}

export const Loader = ({ absolute }: LoaderProps) => (
  <L.Container absolute={absolute}>
    <L.LoaderContainer>
      <L.Loader />
    </L.LoaderContainer>
  </L.Container>
)
