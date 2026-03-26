import type { FiltersInterfaces } from '@mw-kit/mw-manager'
import { MwIcon } from '@mw-kit/mw-ui'
import { Fragment, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import Bullet from '../../../../../../components/Bullet'

import { useOnClickOutState } from '../../../../../../utils/hooks'

import * as S from './styles'

const formatPercentage = (value: number) =>
  `${new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)}%`

type TaskCycleBar = {
  label: string
  value: number
  color: 'muted' | 'blue' | 'purple'
}

type TaskCycleImpact = {
  value: number
  label: string
}

type TaskCycleCardData = {
  id: string
  title: string
  periodLabel: string
  status: 'active' | 'inactive'
  weekLabel: string
  weekValue: number
  bars: TaskCycleBar[]
  required: 'Sim' | 'Não'
  statusLabel: string
  roleId: number
  frequencyId: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'one_time' | 'recurring'
  validity: 'started' | 'not_started' | 'completed' | 'interrupted'
  categoryId: number
  subCategoryId: number
  productLineId: number
  productId: number
  behavior: string
  frequency: string
  formsCount: number
  daysText: string
  impacts: TaskCycleImpact[]
}

const MOCK_CARDS: TaskCycleCardData[] = [
  {
    id: 'campaign-1',
    title: 'Campanha Maio e Junho Forno de Minas',
    periodLabel: 'Vigência: 01/01/2021 a 31/06/2021 (180 dias)',
    status: 'active',
    weekLabel: 'Semana (S0)',
    weekValue: 85.0,
    bars: [
      { label: 'A', value: 100, color: 'muted' },
      { label: 'S0', value: 85, color: 'purple' },
      { label: 'S-1', value: 45, color: 'blue' },
    ],
    required: 'Sim',
    statusLabel: 'Ativa',
    roleId: 1,
    frequencyId: 'weekly',
    validity: 'started',
    categoryId: 1,
    subCategoryId: 11,
    productLineId: 111,
    productId: 1111,
    behavior: 'Unificar',
    frequency: 'Semanal',
    formsCount: 10,
    daysText: 'D S T Q Q S S',
    impacts: [
      { value: 500, label: 'PDVS' },
      { value: 15, label: 'Área' },
      { value: 180, label: 'Usuarios' },
      { value: 5, label: 'Linha Prod.' },
      { value: 10, label: 'SKUS' },
    ],
  },
  {
    id: 'campaign-2',
    title: 'CAMPANHA JULHO E AGOSTO...',
    periodLabel: 'Vigência: 01/07/2021 a 31/08/2021 (62 dias)',
    status: 'inactive',
    weekLabel: 'Semana (S0)',
    weekValue: 78.2,
    bars: [
      { label: 'A', value: 100, color: 'muted' },
      { label: 'S0', value: 78.2, color: 'purple' },
      { label: 'S-1', value: 62.5, color: 'blue' },
    ],
    required: 'Sim',
    statusLabel: 'Inativa',
    roleId: 2,
    frequencyId: 'weekly',
    validity: 'completed',
    categoryId: 2,
    subCategoryId: 22,
    productLineId: 222,
    productId: 2222,
    behavior: 'Unificar',
    frequency: 'Semanal',
    formsCount: 8,
    daysText: 'D S T Q Q S S',
    impacts: [
      { value: 320, label: 'PDVS' },
      { value: 12, label: 'Área' },
      { value: 120, label: 'Usuarios' },
      { value: 3, label: 'Linha Prod.' },
      { value: 7, label: 'SKUS' },
    ],
  },
  {
    id: 'campaign-3',
    title: 'CAMPANHA SETEMBRO OUTUBRO...',
    periodLabel: 'Vigência: 01/09/2021 a 31/10/2021 (61 dias)',
    status: 'active',
    weekLabel: 'Semana (S0)',
    weekValue: 92.4,
    bars: [
      { label: 'A', value: 100, color: 'muted' },
      { label: 'S0', value: 92.4, color: 'purple' },
      { label: 'S-1', value: 88.1, color: 'blue' },
    ],
    required: 'Sim',
    statusLabel: 'Ativa',
    roleId: 3,
    frequencyId: 'daily',
    validity: 'started',
    categoryId: 3,
    subCategoryId: 33,
    productLineId: 333,
    productId: 3333,
    behavior: 'Unificar',
    frequency: 'Diária',
    formsCount: 6,
    daysText: 'D S T Q Q S S',
    impacts: [
      { value: 210, label: 'PDVS' },
      { value: 9, label: 'Área' },
      { value: 95, label: 'Usuarios' },
      { value: 2, label: 'Linha Prod.' },
      { value: 18, label: 'SKUS' },
    ],
  },
  {
    id: 'campaign-4',
    title: 'CAMPANHA BLACK FRIDAY...',
    periodLabel: 'Vigência: 01/11/2021 a 30/11/2021 (30 dias)',
    status: 'active',
    weekLabel: 'Semana (S0)',
    weekValue: 74.9,
    bars: [
      { label: 'A', value: 100, color: 'muted' },
      { label: 'S0', value: 74.9, color: 'purple' },
      { label: 'S-1', value: 79.2, color: 'blue' },
    ],
    required: 'Não',
    statusLabel: 'Ativa',
    roleId: 1,
    frequencyId: 'recurring',
    validity: 'started',
    categoryId: 1,
    subCategoryId: 12,
    productLineId: 112,
    productId: 1122,
    behavior: 'Unificar',
    frequency: 'Repetição',
    formsCount: 12,
    daysText: 'D S T Q Q S S',
    impacts: [
      { value: 640, label: 'PDVS' },
      { value: 21, label: 'Área' },
      { value: 240, label: 'Usuarios' },
      { value: 7, label: 'Linha Prod.' },
      { value: 26, label: 'SKUS' },
    ],
  },
  {
    id: 'campaign-5',
    title: 'CAMPANHA NATAL E ANO NOVO...',
    periodLabel: 'Vigência: 01/12/2021 a 10/01/2022 (41 dias)',
    status: 'inactive',
    weekLabel: 'Semana (S0)',
    weekValue: 88.7,
    bars: [
      { label: 'A', value: 100, color: 'muted' },
      { label: 'S0', value: 88.7, color: 'purple' },
      { label: 'S-1', value: 90.0, color: 'blue' },
    ],
    required: 'Sim',
    statusLabel: 'Inativa',
    roleId: 2,
    frequencyId: 'monthly',
    validity: 'interrupted',
    categoryId: 4,
    subCategoryId: 44,
    productLineId: 444,
    productId: 4444,
    behavior: 'Unificar',
    frequency: 'Mensal',
    formsCount: 9,
    daysText: 'D S T Q Q S S',
    impacts: [
      { value: 410, label: 'PDVS' },
      { value: 17, label: 'Área' },
      { value: 160, label: 'Usuarios' },
      { value: 4, label: 'Linha Prod.' },
      { value: 15, label: 'SKUS' },
    ],
  },
  {
    id: 'campaign-6',
    title: 'CAMPANHA LANÇAMENTOS Q1...',
    periodLabel: 'Vigência: 01/02/2022 a 30/04/2022 (88 dias)',
    status: 'active',
    weekLabel: 'Semana (S0)',
    weekValue: 66.3,
    bars: [
      { label: 'A', value: 100, color: 'muted' },
      { label: 'S0', value: 66.3, color: 'purple' },
      { label: 'S-1', value: 58.4, color: 'blue' },
    ],
    required: 'Sim',
    statusLabel: 'Ativa',
    roleId: 4,
    frequencyId: 'one_time',
    validity: 'not_started',
    categoryId: 5,
    subCategoryId: 55,
    productLineId: 555,
    productId: 5555,
    behavior: 'Unificar',
    frequency: 'Única Vez',
    formsCount: 5,
    daysText: 'D S T Q Q S S',
    impacts: [
      { value: 180, label: 'PDVS' },
      { value: 6, label: 'Área' },
      { value: 70, label: 'Usuarios' },
      { value: 3, label: 'Linha Prod.' },
      { value: 8, label: 'SKUS' },
    ],
  },
  {
    id: 'campaign-7',
    title: 'CAMPANHA PÁSCOA...',
    periodLabel: 'Vigência: 01/03/2022 a 17/04/2022 (48 dias)',
    status: 'active',
    weekLabel: 'Semana (S0)',
    weekValue: 95.1,
    bars: [
      { label: 'A', value: 100, color: 'muted' },
      { label: 'S0', value: 95.1, color: 'purple' },
      { label: 'S-1', value: 93.3, color: 'blue' },
    ],
    required: 'Não',
    statusLabel: 'Ativa',
    roleId: 1,
    frequencyId: 'weekly',
    validity: 'started',
    categoryId: 2,
    subCategoryId: 23,
    productLineId: 223,
    productId: 2233,
    behavior: 'Unificar',
    frequency: 'Semanal',
    formsCount: 7,
    daysText: 'D S T Q Q S S',
    impacts: [
      { value: 290, label: 'PDVS' },
      { value: 11, label: 'Área' },
      { value: 130, label: 'Usuarios' },
      { value: 5, label: 'Linha Prod.' },
      { value: 20, label: 'SKUS' },
    ],
  },
  {
    id: 'campaign-8',
    title: 'CAMPANHA FESTA JUNINA...',
    periodLabel: 'Vigência: 01/06/2022 a 30/06/2022 (30 dias)',
    status: 'inactive',
    weekLabel: 'Semana (S0)',
    weekValue: 81.0,
    bars: [
      { label: 'A', value: 100, color: 'muted' },
      { label: 'S0', value: 81.0, color: 'purple' },
      { label: 'S-1', value: 77.4, color: 'blue' },
    ],
    required: 'Sim',
    statusLabel: 'Inativa',
    roleId: 3,
    frequencyId: 'weekly',
    validity: 'completed',
    categoryId: 3,
    subCategoryId: 31,
    productLineId: 311,
    productId: 3111,
    behavior: 'Unificar',
    frequency: 'Semanal',
    formsCount: 11,
    daysText: 'D S T Q Q S S',
    impacts: [
      { value: 360, label: 'PDVS' },
      { value: 14, label: 'Área' },
      { value: 155, label: 'Usuarios' },
      { value: 6, label: 'Linha Prod.' },
      { value: 9, label: 'SKUS' },
    ],
  },
  {
    id: 'campaign-9',
    title: 'CAMPANHA BACK TO SCHOOL...',
    periodLabel: 'Vigência: 15/01/2022 a 28/02/2022 (45 dias)',
    status: 'active',
    weekLabel: 'Semana (S0)',
    weekValue: 76.0,
    bars: [
      { label: 'A', value: 100, color: 'muted' },
      { label: 'S0', value: 76.0, color: 'purple' },
      { label: 'S-1', value: 70.2, color: 'blue' },
    ],
    required: 'Sim',
    statusLabel: 'Ativa',
    roleId: 2,
    frequencyId: 'biweekly',
    validity: 'started',
    categoryId: 6,
    subCategoryId: 66,
    productLineId: 666,
    productId: 6666,
    behavior: 'Unificar',
    frequency: 'Quinzenal',
    formsCount: 4,
    daysText: 'D S T Q Q S S',
    impacts: [
      { value: 270, label: 'PDVS' },
      { value: 10, label: 'Área' },
      { value: 110, label: 'Usuarios' },
      { value: 3, label: 'Linha Prod.' },
      { value: 12, label: 'SKUS' },
    ],
  },
  {
    id: 'campaign-10',
    title: 'CAMPANHA VAREJO DIGITAL...',
    periodLabel: 'Vigência: 01/05/2022 a 31/07/2022 (92 dias)',
    status: 'active',
    weekLabel: 'Semana (S0)',
    weekValue: 89.9,
    bars: [
      { label: 'A', value: 100, color: 'muted' },
      { label: 'S0', value: 89.9, color: 'purple' },
      { label: 'S-1', value: 84.1, color: 'blue' },
    ],
    required: 'Não',
    statusLabel: 'Ativa',
    roleId: 5,
    frequencyId: 'monthly',
    validity: 'started',
    categoryId: 7,
    subCategoryId: 77,
    productLineId: 777,
    productId: 7777,
    behavior: 'Unificar',
    frequency: 'Mensal',
    formsCount: 3,
    daysText: 'D S T Q Q S S',
    impacts: [
      { value: 190, label: 'PDVS' },
      { value: 8, label: 'Área' },
      { value: 90, label: 'Usuarios' },
      { value: 2, label: 'Linha Prod.' },
      { value: 6, label: 'SKUS' },
    ],
  },
  {
    id: 'campaign-11',
    title: 'CAMPANHA SAZONAL VERÃO...',
    periodLabel: 'Vigência: 01/12/2022 a 28/02/2023 (90 dias)',
    status: 'inactive',
    weekLabel: 'Semana (S0)',
    weekValue: 72.1,
    bars: [
      { label: 'A', value: 100, color: 'muted' },
      { label: 'S0', value: 72.1, color: 'purple' },
      { label: 'S-1', value: 74.0, color: 'blue' },
    ],
    required: 'Sim',
    statusLabel: 'Inativa',
    roleId: 1,
    frequencyId: 'weekly',
    validity: 'interrupted',
    categoryId: 1,
    subCategoryId: 13,
    productLineId: 113,
    productId: 1133,
    behavior: 'Unificar',
    frequency: 'Semanal',
    formsCount: 14,
    daysText: 'D S T Q Q S S',
    impacts: [
      { value: 520, label: 'PDVS' },
      { value: 19, label: 'Área' },
      { value: 210, label: 'Usuarios' },
      { value: 8, label: 'Linha Prod.' },
      { value: 22, label: 'SKUS' },
    ],
  },
  {
    id: 'campaign-12',
    title: 'CAMPANHA FIM DE SEMANA...',
    periodLabel: 'Vigência: 01/08/2022 a 31/08/2022 (31 dias)',
    status: 'active',
    weekLabel: 'Semana (S0)',
    weekValue: 90.2,
    bars: [
      { label: 'A', value: 100, color: 'muted' },
      { label: 'S0', value: 90.2, color: 'purple' },
      { label: 'S-1', value: 87.0, color: 'blue' },
    ],
    required: 'Não',
    statusLabel: 'Ativa',
    roleId: 2,
    frequencyId: 'daily',
    validity: 'started',
    categoryId: 8,
    subCategoryId: 88,
    productLineId: 888,
    productId: 8888,
    behavior: 'Unificar',
    frequency: 'Diária',
    formsCount: 2,
    daysText: 'D S T Q Q S S',
    impacts: [
      { value: 140, label: 'PDVS' },
      { value: 5, label: 'Área' },
      { value: 55, label: 'Usuarios' },
      { value: 1, label: 'Linha Prod.' },
      { value: 4, label: 'SKUS' },
    ],
  },
]

const buildTaskDetailsUrl = (card: TaskCycleCardData) => {
  const params = new URLSearchParams({
    title: card.title,
    description: `${card.periodLabel} | Frequência: ${card.frequency}`,
  })

  return `/main/dev/task-manager/${card.id}?${params.toString()}`
}

type SortOption = {
  id: 'best' | 'worst' | 'frequency'
  menuLabel: string
  displayLabel: string
}

const SORT_OPTIONS: SortOption[] = [
  {
    id: 'best',
    menuLabel: 'Melhor Performance',
    displayLabel: 'Melhor performance',
  },
  {
    id: 'worst',
    menuLabel: 'Pior Performance',
    displayLabel: 'Pior performance',
  },
  {
    id: 'frequency',
    menuLabel: 'Frequência execução',
    displayLabel: 'Frequência execução',
  },
]

type Card14DetailManagerProps = {
  search?: string
  appliedFilters?: FiltersInterfaces.AppliedFilter[]
}

const getAppliedValues = (
  appliedFilters: FiltersInterfaces.AppliedFilter[],
  name: string,
): unknown[] => {
  const values = appliedFilters
    .filter((filter) => filter.name === name)
    .flatMap((filter) =>
      Array.isArray(filter.value) ? filter.value : [filter.value],
    )
    .filter((value) => value !== undefined && value !== null)

  return values
}

const includesText = (value: string, query: string) =>
  value.toLocaleLowerCase().includes(query.toLocaleLowerCase())

const getCardAccentColor = (card: TaskCycleCardData): string => {
  if (card.status === 'inactive') return '#3455AB'

  if (card.weekValue >= 91) return '#66BB6A'
  if (card.weekValue >= 76) return '#FBCB01'
  return '#E23851'
}

const getStatusDotColor = (card: TaskCycleCardData): string =>
  card.status === 'active' ? '#19c172' : '#9ca3af'

const Card14DetailManager = (props: Card14DetailManagerProps) => {
  const history = useHistory()
  const [sortOpen, setSortOpen] = useState(false)
  const [sort, setSort] = useState<SortOption>(SORT_OPTIONS[0])

  const sortRef = useOnClickOutState<HTMLDivElement>(() => setSortOpen(false))

  const filteredCards = useMemo(() => {
    const search = (props.search ?? '').trim()
    const appliedFilters = props.appliedFilters ?? []

    let data = [...MOCK_CARDS]

    if (search) {
      data = data.filter(
        (card) =>
          includesText(card.title, search) ||
          includesText(card.periodLabel, search) ||
          includesText(card.statusLabel, search),
      )
    }

    const statusValues = getAppliedValues(appliedFilters, 'status')
    if (statusValues.length > 0) {
      data = data.filter((card) => statusValues.includes(card.status))
    }

    const roleValues = getAppliedValues(appliedFilters, 'role_id')
    if (roleValues.length > 0) {
      data = data.filter((card) => roleValues.includes(card.roleId))
    }

    const frequencyValues = getAppliedValues(appliedFilters, 'frequency')
    if (frequencyValues.length > 0) {
      data = data.filter((card) => frequencyValues.includes(card.frequencyId))
    }

    const validityValues = getAppliedValues(appliedFilters, 'validity')
    if (validityValues.length > 0) {
      data = data.filter((card) => validityValues.includes(card.validity))
    }

    const categoryValues = getAppliedValues(appliedFilters, 'category_id')
    if (categoryValues.length > 0) {
      data = data.filter((card) => categoryValues.includes(card.categoryId))
    }

    const subCategoryValues = getAppliedValues(appliedFilters, 'sub_category_id')
    if (subCategoryValues.length > 0) {
      data = data.filter((card) => subCategoryValues.includes(card.subCategoryId))
    }

    const productLineValues = getAppliedValues(appliedFilters, 'product_line_id')
    if (productLineValues.length > 0) {
      data = data.filter((card) => productLineValues.includes(card.productLineId))
    }

    const productValues = getAppliedValues(appliedFilters, 'product_id')
    if (productValues.length > 0) {
      data = data.filter((card) => productValues.includes(card.productId))
    }

    if (sort.id === 'best') {
      data.sort((a, b) => b.weekValue - a.weekValue)
    }

    if (sort.id === 'worst') {
      data.sort((a, b) => a.weekValue - b.weekValue)
    }

    if (sort.id === 'frequency') {
      data.sort((a, b) => a.frequency.localeCompare(b.frequency))
    }

    return data
  }, [props.appliedFilters, props.search, sort.id])

  return (
    <S.Page>
      <S.ListHeader>
        <S.ListHeaderLeft>
          <S.Caret aria-hidden>
            <MwIcon type='feather' icon='chevron_down' width={16} height={16} />
          </S.Caret>

          <strong>Pesquisa (15) Realizado (85,2%) Alcance (98,2%)</strong>
        </S.ListHeaderLeft>

        <S.SortArea ref={sortRef}>
          <S.SortDropdown>
            <S.SortButton type='button' onClick={() => setSortOpen((prev) => !prev)}>
              <S.SortLabel>Ordenar por:</S.SortLabel>
              <S.SortValue>{sort.displayLabel}</S.SortValue>
              <S.SortCaret aria-hidden />
            </S.SortButton>

            {sortOpen && (
              <S.SortMenu role='menu' aria-label='Opções de ordenação'>
                {SORT_OPTIONS.map((option) => (
                  <S.SortMenuItem
                    key={option.id}
                    type='button'
                    role='menuitem'
                    $active={option.id === sort.id}
                    onClick={() => {
                      setSort(option)
                      setSortOpen(false)
                    }}
                  >
                    {option.menuLabel}
                  </S.SortMenuItem>
                ))}
              </S.SortMenu>
            )}
          </S.SortDropdown>

          <Popup
            on='click'
            inverted
            wide
            offset={[8, 0]}
            position='bottom right'
            content={
              <Fragment>
                <S.InfoPopupTitle>Cores do Cards (Alcance % da Pesquisa)</S.InfoPopupTitle>
                <S.InfoLegend>
                  <Bullet content='Sem ação' color='#3455AB' />
                  <Bullet content='76% - 90%' color='#FBCB01' />
                  <Bullet content='0% - 75%' color='#E23851' />
                  <Bullet content='91% - 100%' color='#66BB6A' />
                </S.InfoLegend>
              </Fragment>
            }
            trigger={
              <S.SortInfoButton
                type='button'
                aria-label='Cores do Cards (Alcance % da Pesquisa)'
                onClick={() => setSortOpen(false)}
              >
                <MwIcon type='feather' icon='info' width={16} height={16} />
              </S.SortInfoButton>
            }
          />
        </S.SortArea>
      </S.ListHeader>

      <S.CardsList>
        {filteredCards.map((card) => (
          <S.ItemCard key={card.id} $accentColor={getCardAccentColor(card)}>
            <S.ItemTop>
              <div>
                <S.ItemTitle>{card.title}</S.ItemTitle>
                <S.ItemPeriod>{card.periodLabel}</S.ItemPeriod>
              </div>

              <S.ItemActions>
                <button
                  type='button'
                  aria-label='Abrir detalhes'
                  onClick={() => history.push(buildTaskDetailsUrl(card))}
                >
                  <MwIcon type='feather' icon='external_link' width={16} height={16} />
                </button>
              </S.ItemActions>
            </S.ItemTop>

            <S.ItemMain>
              <S.Bars>
                {card.bars.map((bar) => (
                  <S.BarRow key={bar.label}>
                    <S.BarLabel>{bar.label}</S.BarLabel>
                    <S.BarTrack>
                      <S.BarFill $value={bar.value} $color={bar.color} />
                    </S.BarTrack>
                  </S.BarRow>
                ))}

                <S.BarAxis>
                  <span>0</span>
                  <span>20</span>
                  <span>40</span>
                  <span>60</span>
                  <span>80</span>
                  <span>100</span>
                </S.BarAxis>
              </S.Bars>

              <S.Week>
                <S.WeekValue>{formatPercentage(card.weekValue)}</S.WeekValue>
                <S.WeekLabel>{card.weekLabel}</S.WeekLabel>
              </S.Week>
            </S.ItemMain>

            <S.Details>
              <S.DetailsColumn>
                <S.DetailLine>
                  <strong>Obrigatoriedade:</strong> {card.required}
                </S.DetailLine>
                <S.DetailLine>
                  <strong>Comportamento:</strong> {card.behavior}
                </S.DetailLine>
                <S.DetailLine>
                  <strong>Qtd. Formulário:</strong> {card.formsCount}
                </S.DetailLine>
              </S.DetailsColumn>

              <S.DetailsColumn>
                <S.DetailLine>
                  <strong>Status:</strong>{' '}
                  <S.Status $dotColor={getStatusDotColor(card)}>
                    <span aria-hidden />
                    {card.statusLabel}
                  </S.Status>
                </S.DetailLine>
                <S.DetailLine>
                  <strong>Frequencia:</strong> {card.frequency}
                </S.DetailLine>
                <S.Days>{card.daysText}</S.Days>
              </S.DetailsColumn>
            </S.Details>

            <S.Impact>
              <S.ImpactTitle>Pontos de Impacto:</S.ImpactTitle>
              <S.ImpactGrid>
                {card.impacts.map((impact) => (
                  <S.ImpactItem key={impact.label}>
                    <strong>{impact.value}</strong>
                    <span>{impact.label}</span>
                  </S.ImpactItem>
                ))}
              </S.ImpactGrid>
            </S.Impact>
          </S.ItemCard>
        ))}
      </S.CardsList>
    </S.Page>
  )
}

export default Card14DetailManager
