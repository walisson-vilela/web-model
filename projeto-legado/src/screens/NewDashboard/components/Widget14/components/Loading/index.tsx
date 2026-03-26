import React from 'react'

import { Container, LeftContent, RigthContent, WidgetContainer } from './styles'
import './styles.css'

export function Loading() {
  return (
    <WidgetContainer>
      <header className='skeleton'> - </header>
      <Container>
        <LeftContent>
          <div className='header skeleton'></div>
          <div className='section skeleton'></div>
          <div className='footer1 skeleton'></div>
          <div className='footer2 skeleton'></div>
        </LeftContent>
        <RigthContent>
          <div className='header skeleton'></div>
          <div className='section skeleton'></div>
          <div className='footer1 skeleton'></div>
          <div className='footer2 skeleton'></div>
        </RigthContent>
      </Container>
    </WidgetContainer>
  )
}
