import React from 'react'

import { Container } from './styles'
import './styles.css'

export default function Loading1() {
  return (
    <Container>
      <header>
        <div className='skeleton'></div>
        <div className='skeleton'></div>
      </header>
      <section>
        <div className='skeleton first'></div>
        <div className='skeleton second'></div>
        <div className='skeleton three'></div>
        <div className='skeleton four'></div>
        <div className='skeleton fith '></div>
        <div className='skeleton six'></div>
      </section>
    </Container>
  )
}
