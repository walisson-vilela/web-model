import React from 'react'

import { Container } from './styles'
import './styles.css'

export default function Loading() {
  return (
    <Container>
      <header>
        <div className='skeleton'></div>
        <div className='skeleton'></div>
        <div className='skeleton'></div>
      </header>
      <section>
        <div className='section-wrapper'>
          <div className='pipe1 skeleton'> </div>
          <div className='pipe2 skeleton'> </div>
        </div>
      </section>
    </Container>
  )
}
