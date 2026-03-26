import React from 'react'

import { MwLoader } from '@mw-kit/mw-ui'

import { DistributionActionKey } from '../../constants'
import { DistributionCardData } from '../../interfaces'
import DistributionCard from '../DistributionCard'
import * as S from './styles'

type DistributionListProps = {
  items: DistributionCardData[]
  expandedIds: number[]
  loading: boolean
  onToggleExpand: (id: number) => void
  onSelectAction: (
    action: DistributionActionKey,
    data: DistributionCardData,
  ) => void
  onClickWorkers?: (data: DistributionCardData) => void
}

const DistributionList = ({
  items,
  expandedIds,
  loading,
  onToggleExpand,
  onSelectAction,
  onClickWorkers,
}: DistributionListProps) => {
  const count = items.length
  const isEmpty = count === 0 && !loading
  const isInitialLoading = loading && count === 0

  return (
    <S.Container>
      <S.Title>
        Distribuições <span>({count})</span>
      </S.Title>

      {isInitialLoading ? (
        <S.LoadingState>
          <MwLoader />
        </S.LoadingState>
      ) : isEmpty ? (
        <S.EmptyState>Nenhuma distribuição encontrada.</S.EmptyState>
      ) : (
        <S.CardsWrapper>
          {items.map((item) => (
            <DistributionCard
              key={item.id}
              data={item}
              expanded={expandedIds.includes(item.id)}
              onToggleExpand={() => onToggleExpand(item.id)}
              onSelectAction={(action) => onSelectAction(action, item)}
              onWorkersClick={() => onClickWorkers?.(item)}
            />
          ))}
        </S.CardsWrapper>
      )}

      {loading && count > 0 && (
        <S.LoaderInline>
          <MwLoader />
          <span>Carregando distribuições...</span>
        </S.LoaderInline>
      )}
    </S.Container>
  )
}

export default DistributionList
