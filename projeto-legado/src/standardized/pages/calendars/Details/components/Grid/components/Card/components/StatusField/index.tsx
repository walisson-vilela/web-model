import { ThemeInterface } from '@mw-kit/mw-ui/types'
import moment from 'moment'

import type { Card } from '../../../../types'
import { StatusDiv } from '../../styles'

const StatusComponent = ({
  color,
  label,
}: {
  color: keyof ThemeInterface['colors'] | Parameters<ThemeInterface['getColor']>
  label: string
}) => {
  return (
    <StatusDiv $color={color}>
      <span title={label}>{label}</span>
    </StatusDiv>
  )
}

export const StatusField = ({ data }: { data: Card }) => {
  const now = moment()

  if (now.isAfter(data.ends_at)) {
    return <StatusComponent color='darkGreen' label='Concluido' />
  }

  if (now.isAfter(data.starts_at)) {
    return <StatusComponent color='blue' label='Em andamento' />
  }

  if (now.subtract(1, 'hours').isAfter(data.starts_at)) {
    return <StatusComponent color={['blue', 50]} label='Iniciando' />
  }

  return <StatusComponent color='darkSilver' label='Pendente' />
}
