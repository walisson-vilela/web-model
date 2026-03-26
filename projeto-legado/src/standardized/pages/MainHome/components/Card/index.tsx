import { useState } from 'react'

import LaunchIcon from '../../../../../../public/assets/icons/launch-24px.svg?react'

import * as S from './styles'
import { useOnClickOutState } from '../../../../../utils/hooks'

export type CardStatus = {
  color: string
  tooltip?: {
    title: string
    items: { color: string; label: string }[]
  }
}

type CardProps = {
  id: string
  title?: string
  onDetail?: (id: string) => void
  status?: CardStatus
  footer?: React.ReactNode
  children?: React.ReactNode
}

const chunkItems = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size))
  }
  return chunks
}

const Card = ({
  id,
  title = `Card ${id}`,
  onDetail,
  status,
  footer,
  children,
}: CardProps) => {
  const [statusOpen, setStatusOpen] = useState(false)
  const statusRef = useOnClickOutState<HTMLDivElement>(() => setStatusOpen(false))

  const handleStatusClick = () => {
    if (!status) return
    setStatusOpen((prev) => !prev)
  }

  const tooltipColumns = status?.tooltip
    ? chunkItems(status.tooltip.items, 2)
    : []

  return (
    <S.Container $withStatus={!!status}>
      {status && (
        <S.StatusWrapper ref={statusRef}>
          <S.StatusButton
            type='button'
            $color={status.color}
            onClick={handleStatusClick}
            aria-label='Detalhes do status'
          />

          {status.tooltip && statusOpen && (
            <S.StatusTooltip>
              <strong>{status.tooltip.title}</strong>
              <S.StatusTooltipColumns $columns={tooltipColumns.length}>
                {tooltipColumns.map((column, index) => (
                  <S.StatusTooltipColumn key={`column-${index}`}>
                    {column.map((item) => (
                      <li key={item.label}>
                        <span style={{ background: item.color }} />
                        {item.label}
                      </li>
                    ))}
                  </S.StatusTooltipColumn>
                ))}
              </S.StatusTooltipColumns>
            </S.StatusTooltip>
          )}
        </S.StatusWrapper>
      )}

      <S.Header>
        <span>{title}</span>

        {onDetail && (
          <S.DetailButton type='button' onClick={() => onDetail(id)}>
            <LaunchIcon width={24} height={24} />
          </S.DetailButton>
        )}
      </S.Header>

      <S.Body>{children ?? <p>Conteúdo do card {id}</p>}</S.Body>

      {footer && <S.Footer>{footer}</S.Footer>}
    </S.Container>
  )
}

export default Card
