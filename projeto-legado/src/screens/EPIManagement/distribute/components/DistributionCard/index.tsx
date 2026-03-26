import React, { useMemo } from 'react'

import { Dropdown, DropdownInterfaces } from '@mw-kit/mw-manager'

import { DistributionActionKey, distributionActions } from '../../constants'
import { DistributionCardData } from '../../interfaces'
import EpiTypesCountCell from '../Popups/EpiTypesCountCell'
import * as S from './styles'
import ConferenceTab from './tabs/Conference'
import PendingTab from './tabs/Pending'
import SignedTab from './tabs/Signed'

const formatWeekday = (value: Date) => {
  const weekday = value.toLocaleDateString('pt-BR', { weekday: 'long' })
  return weekday
    .split(' ')
    .map((word) =>
      word
        .split('-')
        .map(
          (chunk) =>
            chunk.charAt(0).toUpperCase() + chunk.slice(1),
        )
        .join('-'),
    )
    .join(' ')
}

const formatCreatedAt = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  const weekday = formatWeekday(date)
  const datePart = date.toLocaleDateString('pt-BR')
  const timePart = date.toLocaleTimeString('pt-BR')

  return `${weekday} - ${datePart} às ${timePart}`
}

const formatBoolean = (value: boolean) => (value ? 'Sim' : 'Não')

const formatKpiValue = (value: number, padToTwo?: boolean) => {
  if (padToTwo && value < 10) {
    return value.toString().padStart(2, '0')
  }

  return value.toLocaleString('pt-BR')
}

type DistributionCardProps = {
  data: DistributionCardData
  expanded: boolean
  onToggleExpand: () => void
  onSelectAction: (action: DistributionActionKey) => void
  onWorkersClick?: () => void
}

const DistributionCard = ({
  data,
  expanded,
  onToggleExpand,
  onSelectAction,
  onWorkersClick,
}: DistributionCardProps) => {
  const [activeTab, setActiveTab] = React.useState<'signed' | 'pending' | 'checklist'>(
    'signed',
  )

  const dropdownItems = useMemo<DropdownInterfaces.Item[]>(
    () =>
      distributionActions.map((action) => ({
        content: action.label,
        onClick: () => onSelectAction(action.key),
        rules: [],
      })),
    [onSelectAction],
  )

  const createdAtLabel = formatCreatedAt(data.createdBy.createdAt)

  const signedCount = data.signaturesSignedCount ?? data.signatures?.done ?? 0
  const expectedCount =
    data.signaturesExpectedCount ?? signedCount + (data.signatures?.pending ?? 0)
  const pendingCount = Math.max(expectedCount - signedCount, 0)
  const signaturesLabel = `${formatKpiValue(
    signedCount,
  )}/${formatKpiValue(pendingCount)}`

  return (
    <S.Card>
      <S.Header>
        <S.ExpandButton type='button' onClick={onToggleExpand}>
          <S.Chevron name='chevron down' $expanded={expanded} />
        </S.ExpandButton>

        <S.HeaderRight>
          <S.DropdownWrapper>
            <Dropdown
              items={dropdownItems}
              axis='y'
              notAbsolute
              centerCoodinates={{ y: 100 }}
            />
          </S.DropdownWrapper>
        </S.HeaderRight>
      </S.Header>

      <S.OverviewColumns>
        <S.TextColumn>
          <S.TextStrong>ID: {data.code || data.id}</S.TextStrong>
          <S.TextMuted>Criado por:</S.TextMuted>
          <S.TextMuted>
            {data.createdBy.name} ({data.createdBy.registry})
          </S.TextMuted>
          <S.TextStrong>{createdAtLabel}</S.TextStrong>
        </S.TextColumn>

        <S.TextColumn>
          <S.TextMuted>Distribuído por:</S.TextMuted>
          <S.TextMuted>
            {data.distributedBy.name} ({data.distributedBy.registry})
          </S.TextMuted>
          <S.TextStrong>
            QTDE Total de itens: {data.totalItems.toLocaleString('pt-BR')}
          </S.TextStrong>
          <S.TextStrong>
            Permitir edição de EPI&apos;s: {formatBoolean(data.allowEditEpis)}
          </S.TextStrong>
        </S.TextColumn>

        <S.KpiColumn>
          {data.epiTypesCount ? (
            <EpiTypesCountCell
              distributionId={data.id}
              count={data.epiTypesCount}
              initialItems={data.epiTypesSummary}
            />
          ) : (
            <>
              <S.KpiValue>{formatKpiValue(data.epiTypesCount, true)}</S.KpiValue>
              <S.KpiLabel>Tipos de EPI&apos;s</S.KpiLabel>
            </>
          )}
        </S.KpiColumn>

        <S.KpiColumn>
          <div
            style={{
              cursor: 'pointer',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            role='button'
            tabIndex={0}
            onClick={onWorkersClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onWorkersClick?.()
            }}
          >
            <S.KpiValue>{formatKpiValue(data.workersCount)}</S.KpiValue>
            <S.KpiLabel>Colaboradores</S.KpiLabel>
          </div>
        </S.KpiColumn>

        <S.KpiColumn>
          <S.KpiValue>{signaturesLabel}</S.KpiValue>
          <S.KpiLabel>Assinaturas realizadas</S.KpiLabel>
        </S.KpiColumn>
      </S.OverviewColumns>

      {expanded && (
        <S.Expanded>
          <S.TabsHeader role='tablist'>
            <S.TabButton
              type='button'
              $active={activeTab === 'signed'}
              onClick={() => setActiveTab('signed')}
              role='tab'
              aria-selected={activeTab === 'signed'}
            >
              Assinados ({formatKpiValue(signedCount)})
            </S.TabButton>

            <S.TabButton
              type='button'
              $active={activeTab === 'pending'}
              onClick={() => setActiveTab('pending')}
              role='tab'
              aria-selected={activeTab === 'pending'}
            >
              Pendentes Assinatura ({formatKpiValue(pendingCount)})
            </S.TabButton>

            <S.TabButton
              type='button'
              $active={activeTab === 'checklist'}
              onClick={() => setActiveTab('checklist')}
              role='tab'
              aria-selected={activeTab === 'checklist'}
            >
              Lista de Conferência EPI&apos;s
            </S.TabButton>
          </S.TabsHeader>

          <S.TabsContent>
            {activeTab === 'signed' && (
              <SignedTab distributionId={data.id} />
            )}
            {activeTab === 'pending' && (
              <PendingTab distributionId={data.id} />
            )}
            {activeTab === 'checklist' && (
              <ConferenceTab distributionId={data.id} />
            )}
          </S.TabsContent>
        </S.Expanded>
      )}
    </S.Card>
  )
}

export default DistributionCard
