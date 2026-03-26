import React from 'react'

import { Container, Progress } from './styles'

interface ProgressColumnProps {
  percent: string | number
  color: string
  label?: JSX.Element | string | (JSX.Element | string)[]
  animated?: boolean
}

const ProgressColumn = (props: ProgressColumnProps) => {
  const { percent, color, animated } = { ...props }

  const label = props.label ? props.label : percent ? `${percent}%` : '-'

  return (
    <Container>
      <Progress percent={percent || 0} color={color || 'black'} animated>
        <div />
      </Progress>

      {label}
    </Container>
  )
}

export default ProgressColumn
