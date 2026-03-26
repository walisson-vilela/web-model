import { useMemo } from 'react'

import * as S from './styles'

const DATA = {
  realized: 88.7,
  reach: 98.0,
}

const formatPercentage = (value: number) =>
  `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)}%`

const TasksPerCycle = () => {
  const metrics = useMemo(
    () => [
      { label: 'Realizado', value: formatPercentage(DATA.realized) },
      { label: 'Alcance sobre planejado', value: formatPercentage(DATA.reach) },
    ],
    []
  )

  return (
    <S.Container>
      {metrics.map((metric, index) => (
        <S.Metric key={metric.label} aria-label={`${metric.label}: ${metric.value}`}>
          <strong>{metric.value}</strong>
          <span>
            {metric.label}
            {index === 1 && <S.DropIndicator aria-hidden>▼</S.DropIndicator>}
          </span>
        </S.Metric>
      ))}
    </S.Container>
  )
}

export default TasksPerCycle
