import type { ReactNode } from 'react'
import { useState } from 'react'

import { useOnClickOutState } from '../../../../../../utils/hooks'
import type { CardView } from '../../../cardViewTypes'
import type { Card14Data } from '../../../types'

import * as S from './styles'

const formatPercentage = (value: number) =>
  `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)}%`

type Card14ContentProps = {
  data: Card14Data
}

const Card14Content = ({ data }: Card14ContentProps) => {
  const [open, setOpen] = useState(false)
  const legendRef = useOnClickOutState<HTMLDivElement>(() => setOpen(false))

  const hasLegend = data.legend?.values && data.legend.values.length > 0

  return (
    <S.Body>
      <S.Columns>
        <S.Column>
          <S.MainValue>{formatPercentage(data.realized)}</S.MainValue>
          <S.Label>Realizado</S.Label>
        </S.Column>

        <S.Divider />

        <S.Column>
          <S.ReachWrapper ref={legendRef}>
            <S.ReachHeader>
              <S.MainValue>{formatPercentage(data.reach)}</S.MainValue>

              {hasLegend && (
                <S.CaretButton
                  type='button'
                  onClick={() => setOpen((prev) => !prev)}
                  aria-label='Detalhes por ciclo'
                >
                  <S.Caret $open={open}>
                    <span />
                  </S.Caret>
                </S.CaretButton>
              )}
            </S.ReachHeader>

            {hasLegend && open && (
              <S.LegendTooltip>
                <S.LegendTitle>{data.legend.title}</S.LegendTitle>
                <S.LegendHeader>
                  <span />
                  <span>Realizada</span>
                  <span>Alcance</span>
                </S.LegendHeader>
                <S.LegendList>
                  {data.legend.values.map((item) => (
                    <li key={item.label}>
                      <strong>{item.label}</strong>
                      <span>{formatPercentage(item.realized)}</span>
                      <span>{formatPercentage(item.reach)}</span>
                    </li>
                  ))}
                </S.LegendList>
              </S.LegendTooltip>
            )}
          </S.ReachWrapper>

          <S.Label>Alcance sobre o planejado</S.Label>
        </S.Column>
      </S.Columns>
    </S.Body>
  )
}

export const buildCard14View = (data: Card14Data): CardView => {
  const content: ReactNode = <Card14Content data={data} />

  return {
    title: 'Tarefas por ciclo de execuções',
    content,
  }
}
