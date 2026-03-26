import { useMemo } from 'react'

import * as S from './styles'

const DISTANCE_DATA = {
  planned_avg_km: 5.7,
  done_avg_km: 7.3,
}

const formatKm = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)

const AverageDistance = () => {
  const metrics = useMemo(
    () => [
      { label: 'Previsto', value: formatKm(DISTANCE_DATA.planned_avg_km) },
      { label: 'Realizado', value: formatKm(DISTANCE_DATA.done_avg_km) },
    ],
    []
  )

  return (
    <S.Container>
      {metrics.map((metric) => (
        <S.Metric key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </S.Metric>
      ))}
    </S.Container>
  )
}

export default AverageDistance
