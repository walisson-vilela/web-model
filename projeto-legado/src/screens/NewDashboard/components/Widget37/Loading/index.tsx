import React from 'react'

import { Container } from './styles'
import './styles.css'

export default function Loading1() {
  return (
    <Container>
      <header>
        <div className='skeleton'></div>
      </header>
      <section>
        <div className='skeleton'></div>
        <div className='skeleton'></div>
        <div className='skeleton'></div>
      </section>
    </Container>
  )
}
