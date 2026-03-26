import React from 'react'

import { Container } from './styles'
import './styles.css'

export default function Loading() {
  return (
    <Container>
      <header>
        <div className='skeleton'></div>
      </header>
      <section>
        <div className='skeleton ball'></div>
      </section>
    </Container>
  )
}
