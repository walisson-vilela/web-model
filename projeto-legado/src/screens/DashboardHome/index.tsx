import { ReactNode } from 'react'

import MwManagerContainer from '../../components/ManagerContainer'
import { createRouteTab } from '../../routes'

import type { CardStatus } from './components/Card'
import Card from './components/Card'
import FiltersBar from './components/FiltersBar'
import RangeQuality from './components/cards/RangeQuality'
import SpeedAverage from './components/cards/SpeedAverage'
import AverageDistance from './components/cards/AverageDistance'
import Mood from './components/cards/Mood'
import AttendanceJustification from './components/cards/AttendanceJustification'
import TmoPerformance from './components/cards/TmoPerformance'
import TmoXray from './components/cards/TmoXray'
import TasksPerCycle from './components/cards/TasksPerCycle'
import { DashboardFiltersProvider } from './filters'
import * as S from './styles'

type CardConfig = {
  id: string
  title: string
  height: number
  column: 1 | 2 | 3
  stack?: 'A' | 'B'
  status?: CardStatus
  tooltip?: {
    title: string
    items: { color: CardStatus; label: string }[]
  }
  metrics?: { label: string; value: string }[]
  content?: ReactNode
  footer?: {
    label: string
    value: string
    suffix?: string
    accent?: string
    align?: 'left' | 'right'
  }
  footerContent?: ReactNode
}

type DashboardHomeContentProps = {
  onOpenDetail: (cardId: string) => void
}

const buildCard = (config: CardConfig): CardConfig => config

const buildStatusTooltip = (title: string): CardConfig['tooltip'] => ({
  title,
  items: [
    { color: 'green', label: 'Dentro da meta' },
    { color: 'yellow', label: 'Atenção' },
    { color: 'red', label: 'Crítico' },
  ],
})

const CARD1_DATA = {
  active: 900,
  temporary_inactive: 100,
  coverage: 700,
  partial: 100,
  uncoverage: 100,
  without_route: 100,
  total_routes: 900,
  coverage_routes: 800,
  coverage_percentage: 88.9,
}

const formatPercentage = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)

const CARD2_DATA = {
  active_users: 200,
  total_users: 250,
  adherence: 80.0,
}

const CARD3_DATA = {
  total_users: 250,
  attendance_started: 50,
  attendance_not_started: 10,
  percentage_started: 25.1,
  percentage_not_started: 4.2,
  '2_h': 3,
  '4_h': 5,
  '24_h': 20,
  desconected: 25.0,
}

const CARD4_DATA = {
  attendances: 399,
  coverage: 384,
  uncoverage: 20,
  added: 15,
  open: 100,
  justified: 4,
  completed: 133,
  punctuality: 43.7,
  performance: 80.0,
  performed: 133,
  planned: 399,
}

const CARD5_DATA = {
  high: 150,
  high_percentage: 60.0,
  medium: 90,
  medium_percentage: 36.0,
  low: 10,
  low_percentage: 4.0,
  average_consumption: 10,
}

const CARD6_DATA = {
  registries: 95,
  images: 100,
  users_impacted: 10.1,
  users_total: 20,
}

const getStatusAccent = (status: CardStatus) => {
  switch (status) {
    case 'green':
      return '#19c172'
    case 'yellow':
      return '#FBCF30'
    case 'blue':
      return '#3B82F6'
    case 'red':
    default:
      return '#E23851'
  }
}

const getAdherenceStatus = (percentage: number): CardStatus => {
  if (percentage >= 95) return 'green'
  if (percentage >= 75) return 'yellow'
  return 'red'
}

const getDisconnectedStatus = (percentage: number): CardStatus => {
  if (percentage <= 10) return 'green'
  if (percentage <= 20) return 'yellow'
  return 'red'
}

const getPunctualityStatus = (value: number | null | undefined): CardStatus => {
  if (value == null) return 'blue'
  if (value >= 98) return 'green'
  if (value >= 75) return 'yellow'
  return 'red'
}

const getConsumptionStatus = (value: number): CardStatus => {
  if (value <= 10) return 'green'
  return 'red'
}

const getUsersImpactedStatus = (value: number): CardStatus => {
  if (value <= 10) return 'green'
  if (value <= 20) return 'yellow'
  return 'red'
}

const card1CoverageLabel = `${formatPercentage(CARD1_DATA.coverage_percentage)}%`
const card1Status: CardStatus =
  CARD1_DATA.coverage_percentage === 100 ? 'green' : 'red'
const card1FooterAccent = getStatusAccent(card1Status)

const card2AdherenceLabel = `${formatPercentage(CARD2_DATA.adherence)}%`
const card2Status = getAdherenceStatus(CARD2_DATA.adherence)
const card2FooterAccent = getStatusAccent(card2Status)

const card3Status = getDisconnectedStatus(CARD3_DATA.desconected)
const card3StartedPct = `${formatPercentage(CARD3_DATA.percentage_started)}%`
const card3NotStartedPct = `${formatPercentage(CARD3_DATA.percentage_not_started)}%`
const card4Status = getPunctualityStatus(CARD4_DATA.punctuality)
const card4PunctualityLabel =
  CARD4_DATA.punctuality == null ? '--' : `${formatPercentage(CARD4_DATA.punctuality)}%`
const card4PerformanceLabel = `${formatPercentage(CARD4_DATA.performance)}%`
const card5Status = getConsumptionStatus(CARD5_DATA.average_consumption)
const card5HighPct = `${formatPercentage(CARD5_DATA.high_percentage)}%`
const card5MediumPct = `${formatPercentage(CARD5_DATA.medium_percentage)}%`
const card5LowPct = `${formatPercentage(CARD5_DATA.low_percentage)}%`
const card5ConsumptionLabel = `${formatPercentage(CARD5_DATA.average_consumption)}%`
const card5FooterAccent = getStatusAccent(card5Status)
const card6Status = getUsersImpactedStatus(CARD6_DATA.users_impacted)
const card6UsersImpactedLabel = `${formatPercentage(CARD6_DATA.users_impacted)}%`
const card6FooterAccent = getStatusAccent(card6Status)

const CARD_LAYOUT: CardConfig[] = [
  buildCard({
    id: 'card-1',
    title: `Usuários Ativos ${CARD1_DATA.active} | Inativos Temporários: ${CARD1_DATA.temporary_inactive}`,
    column: 1,
    height: 135,
    status: card1Status,
    tooltip: {
      title: 'Cobertura dos roteiros',
      items: [
        { color: 'green', label: 'Igual a 100%' },
        { color: 'red', label: 'Abaixo de 100%' },
      ],
    },
    content: (
      <>
        <S.CardLine>
          Roteiro Fixo Coberto: {CARD1_DATA.coverage} | Parcial: {CARD1_DATA.partial} | Descoberto:{' '}
          {CARD1_DATA.uncoverage}
        </S.CardLine>
        <S.CardLine $color='#E23851'>
          Usuários Ativos s/roteiro: {CARD1_DATA.without_route}
        </S.CardLine>
      </>
    ),
    footer: {
      label: 'Cobertura dos roteiros:',
      value: card1CoverageLabel,
      suffix: `(${CARD1_DATA.coverage_routes}/${CARD1_DATA.total_routes})`,
      accent: card1FooterAccent,
      align: 'right',
    },
  }),
  buildCard({
    id: 'card-2',
    title: 'Iniciaram Atendimento',
    column: 2,
    height: 135,
    status: card2Status,
    tooltip: {
      title: 'Aderência ao Atendimento',
      items: [
        { color: 'red', label: '0% - 75%' },
        { color: 'yellow', label: '75% - 95%' },
        { color: 'green', label: '95% - 100%' },
      ],
    },
    content: (
      <S.CardLine>Usuários Ativos: {CARD2_DATA.active_users}/{CARD2_DATA.total_users}</S.CardLine>
    ),
    footer: {
      label: 'Aderência ao Atendimento:',
      value: card2AdherenceLabel,
      accent: card2FooterAccent,
      align: 'right',
    },
  }),
  buildCard({
    id: 'card-3',
    title: 'Usuários Ativos Desconectados',
    column: 3,
    height: 135,
    status: card3Status,
    tooltip: {
      title: 'Desconectados',
      items: [
        { color: 'green', label: '0% - 10%' },
        { color: 'yellow', label: '10% - 20%' },
        { color: 'red', label: 'Acima de 20%' },
      ],
    },
    content: (
      <>
        <S.CardLine>
          Com Atendimento Iniciado: {CARD3_DATA.attendance_started}/{CARD3_DATA.total_users} ({card3StartedPct})
        </S.CardLine>
        <S.CardLine>
          Sem Atendimento Iniciado: {CARD3_DATA.attendance_not_started}/{CARD3_DATA.total_users} ({card3NotStartedPct})
        </S.CardLine>
      </>
    ),
    footer: {
      label: `+ 2 Horas (${CARD3_DATA['2_h']}) | + 4 Horas (${CARD3_DATA['4_h']}) | + 1 dia (${CARD3_DATA['24_h']})`,
      value: '',
      align: 'right',
    },
  }),
  buildCard({
    id: 'card-4',
    title: `Atendimentos: ${CARD4_DATA.attendances} (PDV's)`,
    column: 1,
    height: 135,
    status: card4Status,
    tooltip: {
      title: 'Pontualidade',
      items: [
        { color: 'blue', label: 'Neutro' },
        { color: 'red', label: '0% - 75%' },
        { color: 'yellow', label: '75% - 95%' },
        { color: 'green', label: '98% - 100%' },
      ],
    },
    content: (
      <>
        <S.CardLine>
          Previstos Cobertos: {CARD4_DATA.coverage} | Descobertos: {CARD4_DATA.uncoverage} | Adicionado: {CARD4_DATA.added}
        </S.CardLine>
        <S.CardLine>
          Abertos: {CARD4_DATA.open} | Justificados: {CARD4_DATA.justified} | Concluídos: {CARD4_DATA.completed}
        </S.CardLine>
      </>
    ),
    footerContent: (
      <S.CardFooterSplit>
        <S.CardFooterSplitItem>
          <span>Pontualidade:</span>
          <S.CardFooterValue>{card4PunctualityLabel}</S.CardFooterValue>
        </S.CardFooterSplitItem>
        <S.CardFooterSplitItem>
          <span>Performance:</span>
          <S.CardFooterValue>{card4PerformanceLabel}</S.CardFooterValue>
          <span>
            ({CARD4_DATA.performed}/{CARD4_DATA.planned})
          </span>
        </S.CardFooterSplitItem>
      </S.CardFooterSplit>
    ),
  }),
  buildCard({
    id: 'card-5',
    title: 'Nível da Bateria',
    column: 2,
    height: 135,
    status: card5Status,
    tooltip: {
      title: 'Consumo Médio',
      items: [
        { color: 'green', label: '0% - 10%' },
        { color: 'red', label: 'Acima de 10%' },
      ],
    },
    content: (
      <S.CardLine>
        Alto: {CARD5_DATA.high} ({card5HighPct}) | Médio: {CARD5_DATA.medium} ({card5MediumPct}) | Baixo: {CARD5_DATA.low} ({card5LowPct})
      </S.CardLine>
    ),
    footer: {
      label: 'Consumo Médio Atual:',
      value: card5ConsumptionLabel,
      suffix: 'por hora',
      accent: card5FooterAccent,
      align: 'right',
    },
  }),
  buildCard({
    id: 'card-6',
    title: 'Dados Pendentes de Transmissão',
    column: 3,
    height: 135,
    status: card6Status,
    tooltip: {
      title: 'Usuários Impactados',
      items: [
        { color: 'green', label: '0% - 10%' },
        { color: 'yellow', label: '10% - 20%' },
        { color: 'red', label: 'Acima de 20%' },
      ],
    },
    content: (
      <S.CardLine>
        Pesquisas: {CARD6_DATA.registries} | Imagens: {CARD6_DATA.images}
      </S.CardLine>
    ),
    footer: {
      label: 'Usuários Impactados:',
      value: card6UsersImpactedLabel,
      suffix: `(${CARD6_DATA.users_total})`,
      accent: card6FooterAccent,
      align: 'right',
    },
  }),
  buildCard({
    id: 'card-7',
    title: 'Range Quality',
    column: 1,
    height: 245,
    content: <RangeQuality />,
  }),
  buildCard({
    id: 'card-8',
    title: 'Velocidade Média',
    column: 2,
    height: 245,
    content: <SpeedAverage />,
  }),
  buildCard({
    id: 'card-9',
    title: 'Distância Média (km)',
    column: 3,
    height: 115,
    stack: 'A',
    content: <AverageDistance />, 
  }),
  buildCard({
    id: 'card-10',
    title: 'Humor',
    column: 3,
    height: 115,
    stack: 'A',
    content: <Mood />,
  }),
  buildCard({
    id: 'card-11',
    title: 'Justificativa de não Atendimento (S)',
    column: 1,
    height: 245,
    content: <AttendanceJustification />,
  }),
  buildCard({
    id: 'card-12',
    title: 'TMO X Performance',
    column: 2,
    height: 245,
    content: <TmoPerformance />,
  }),
  buildCard({
    id: 'card-13',
    title: 'TMO Raio X S0',
    column: 3,
    height: 115,
    stack: 'B',
    content: <TmoXray />,
  }),
  buildCard({
    id: 'card-14',
    title: 'Tarefas por ciclo de execuções',
    column: 3,
    height: 115,
    stack: 'B',
    content: <TasksPerCycle />,
  }),
]

type RowItem = string | { stack: string[] }

const CARD_ROWS: RowItem[][] = [
  ['card-1', 'card-2', 'card-3'],
  ['card-4', 'card-5', 'card-6'],
  ['card-7', 'card-8', { stack: ['card-9', 'card-10'] }],
  ['card-11', 'card-12', { stack: ['card-13', 'card-14'] }],
]

const DashboardHomeView = ({ onOpenDetail }: DashboardHomeContentProps) => {
  const renderCard = (cardId: string) => {
    const card = CARD_LAYOUT.find((item) => item.id === cardId)
    if (!card) return null

    const footerNode = card.footerContent
      ? card.footerContent
      : card.footer ? (
          <S.CardFooterRow $accent={card.footer.accent} $align={card.footer.align}>
            <span>{card.footer.label}</span>
            <S.CardFooterValue $accent={card.footer.accent}>{card.footer.value}</S.CardFooterValue>
            {card.footer.suffix && <span>{card.footer.suffix}</span>}
          </S.CardFooterRow>
        ) : undefined

    return (
      <Card
        key={card.id}
        title={card.title}
        status={card.status}
        tooltip={card.tooltip}
        onDetail={() => onOpenDetail(card.id)}
        footer={footerNode}
        style={{ minHeight: card.height }}
      >
        {card.content ||
          card.metrics?.map((metric) => (
            <S.CardMetric key={`${card.id}-${metric.label}`}>
              <strong>{metric.label}</strong>
              <span>{metric.value}</span>
            </S.CardMetric>
          ))}
      </Card>
    )
  }

  return (
    <S.Page>
      <S.FiltersSection>
        <FiltersBar />
        <S.Divider />
      </S.FiltersSection>

      <S.CardsArea>
        <S.CardsRows>
          {CARD_ROWS.map((row, rowIndex) => (
            <S.Row key={`row-${rowIndex}`}>
              {row.map((columnItem, columnIndex) => {
                if (typeof columnItem === 'string') {
                  return (
                    <S.RowColumn key={`row-${rowIndex}-col-${columnIndex}`}>
                      {renderCard(columnItem)}
                    </S.RowColumn>
                  )
                }

                return (
                  <S.RowColumn key={`row-${rowIndex}-col-${columnIndex}`}>
                    <S.StackedColumn>
                      {columnItem.stack.map((id) => renderCard(id))}
                    </S.StackedColumn>
                  </S.RowColumn>
                )
              })}
            </S.Row>
          ))}
        </S.CardsRows>
      </S.CardsArea>
    </S.Page>
  )
}

const DashboardHome = createRouteTab((props) => {
  const route = props?.data?.route
  if (!route) return null
  const { match, history } = route

  const navigateToDetail = (cardId: string) => {
    const base = match.url.replace(/\/$/, '')
    history.push(`${base}/${cardId}`)
  }

  return (
    <DashboardFiltersProvider>
      <MwManagerContainer>
        <DashboardHomeView onOpenDetail={navigateToDetail} />
      </MwManagerContainer>
    </DashboardFiltersProvider>
  )
})

export default DashboardHome
