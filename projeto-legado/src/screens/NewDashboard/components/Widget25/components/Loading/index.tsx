import React from 'react'

import { Container } from './styles'
import './styles.css'

export default function Loading() {
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
        <div className='skeleton seven'></div>
        <div className='skeleton eight'></div>
        <div className='skeleton nine'></div>
        <div className='skeleton ten'></div>
        <div className='skeleton eleven '></div>
        <div className='skeleton twelve'></div>
      </section>
    </Container>
  )
}
