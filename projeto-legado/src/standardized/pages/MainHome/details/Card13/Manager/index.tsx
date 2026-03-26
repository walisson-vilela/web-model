import { useMemo, useState } from 'react'

import {
  FiltersInterfaces,
  MwManager,
  SortState,
  Toolbar
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'

import type { ColumnInterface } from '@mw-kit/mw-manager'

import ManagerCounter from '../../../../../../components/ManagerCounter'
import Tabs from '../../../../../../components/Tabs'

import MonthPicker from './components/MonthPicker'
import PeriodPicker, { type PeriodValue } from './components/PeriodPicker'
import collaboratorFilters from './filters'
import * as S from './styles'

type ConsolidatedRow = {
  id: string
  date: string
  weekday: string
  planned: string
  realized: string
  performance: string
  added: string
  justified: string
  not_attended: string
}

type CollaboratorRow = {
  id: string
  name: string
  month: string
  planned: string
  realized: string
  performance: string
  added: string
  justified: string
  not_attended: string
}

const CONSOLIDATED_COLUMNS: ColumnInterface[] = [
  { content: 'Data', key: 'date', textAlign: 'left', width: 2 },
  { content: 'Dias da semana', key: 'weekday', textAlign: 'left', width: 3 },
  {
    content: "Total PDV's Previstos",
    key: 'planned',
    textAlign: 'center',
    width: 3,
  },
  { content: 'Realizado', key: 'realized', textAlign: 'center', width: 2 },
  {
    content: 'Performance %',
    key: 'performance',
    textAlign: 'center',
    width: 2,
  },
  { content: 'Adicionado', key: 'added', textAlign: 'center', width: 2 },
  { content: 'Justificado', key: 'justified', textAlign: 'center', width: 2 },
  {
    content: 'Não Atendidos',
    key: 'not_attended',
    textAlign: 'center',
    width: 2,
  },
]

const COLLABORATOR_COLUMNS: ColumnInterface[] = [
  { content: 'Nome', key: 'name', textAlign: 'left', width: 4 },
  { content: 'Mês', key: 'month', textAlign: 'left', width: 2 },
  {
    content: "Total PDV's Previstos",
    key: 'planned',
    textAlign: 'center',
    width: 3,
  },
  { content: 'Realizado', key: 'realized', textAlign: 'center', width: 2 },
  {
    content: 'Performance %',
    key: 'performance',
    textAlign: 'center',
    width: 2,
  },
  { content: 'Adicionado', key: 'added', textAlign: 'center', width: 2 },
  { content: 'Justificado', key: 'justified', textAlign: 'center', width: 2 },
  {
    content: 'Não Atendidos',
    key: 'not_attended',
    textAlign: 'center',
    width: 2,
  },
]

const CONSOLIDATED_ROWS: ConsolidatedRow[] = [
  {
    id: '1',
    date: '20/09/22',
    weekday: 'Domingo',
    planned: '1.000',
    realized: '950',
    performance: '95,0%',
    added: '10',
    justified: '30',
    not_attended: '10',
  },
  {
    id: '2',
    date: '21/09/22',
    weekday: 'Segunda',
    planned: '950',
    realized: '700',
    performance: '73,6%',
    added: '15',
    justified: '25',
    not_attended: '30',
  },
  {
    id: '3',
    date: '22/09/22',
    weekday: 'Terça',
    planned: '850',
    realized: '755',
    performance: '88,8%',
    added: '30',
    justified: '15',
    not_attended: '20',
  },
  {
    id: '4',
    date: '23/09/22',
    weekday: 'Quarta',
    planned: '750',
    realized: '375',
    performance: '50,0%',
    added: '25',
    justified: '10',
    not_attended: '15',
  },
  {
    id: '5',
    date: '24/09/22',
    weekday: 'Sexta',
    planned: '1.000',
    realized: '850',
    performance: '85,0%',
    added: '7',
    justified: '15',
    not_attended: '30',
  },
  {
    id: '6',
    date: '25/09/22',
    weekday: 'Sábado',
    planned: '850',
    realized: '750',
    performance: '88,2%',
    added: '35',
    justified: '15',
    not_attended: '25',
  },
]

const COLLABORATOR_ROWS: CollaboratorRow[] = [
  {
    id: '1',
    name: 'Rachel Patel',
    month: 'Janeiro',
    planned: '1.000',
    realized: '950',
    performance: '95,0%',
    added: '10',
    justified: '30',
    not_attended: '10',
  },
  {
    id: '2',
    name: 'Julie Adams',
    month: 'Janeiro',
    planned: '950',
    realized: '700',
    performance: '73,6%',
    added: '15',
    justified: '25',
    not_attended: '30',
  },
  {
    id: '3',
    name: 'Jó Licon',
    month: 'Janeiro',
    planned: '850',
    realized: '755',
    performance: '88,8%',
    added: '30',
    justified: '15',
    not_attended: '20',
  },
  {
    id: '4',
    name: 'Carlos Soares',
    month: 'Janeiro',
    planned: '750',
    realized: '375',
    performance: '50,0%',
    added: '25',
    justified: '10',
    not_attended: '15',
  },
  {
    id: '5',
    name: 'Marina Silva',
    month: 'Janeiro',
    planned: '1.000',
    realized: '850',
    performance: '85,0%',
    added: '7',
    justified: '15',
    not_attended: '30',
  },
  {
    id: '6',
    name: 'Cristiano Sampaio',
    month: 'Janeiro',
    planned: '850',
    realized: '750',
    performance: '88,2%',
    added: '35',
    justified: '15',
    not_attended: '25',
  },
]

const Card13DetailManager = () => {
  const [activeTab, setActiveTab] = useState(0)

  const [page, setPage] = useState(1)
  const [isLastPage] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortState | null>(null)
  const [appliedFilters, setAppliedFilters] = useState<FiltersInterfaces.AppliedFilter[]>([])

  const [month, setMonth] = useState(() => new Date(2022, 0, 1))
  const [period, setPeriod] = useState<PeriodValue>('s0')

  const reload = () => {
    // mock
  }

  const paginator = () => {
    // mock
  }

  const onClickExtractData = () => {
    // mock
  }

  const rows = useMemo(() => (activeTab === 0 ? CONSOLIDATED_ROWS : COLLABORATOR_ROWS), [activeTab])
  const totalRegistries = rows.length

  const columns = useMemo(
    () => (activeTab === 0 ? CONSOLIDATED_COLUMNS : COLLABORATOR_COLUMNS),
    [activeTab],
  )

  const filters = useMemo(
    () => (activeTab === 1 ? collaboratorFilters : []),
    [activeTab],
  )

  const toolbarFilters = useMemo(() => {
    if (activeTab !== 1) return undefined
    return { filters, appliedFilters, setAppliedFilters }
  }, [activeTab, appliedFilters, filters])

  return (
    <S.Wrapper>
      <S.TabsWrap>
        <Tabs
          active={{ active: activeTab, setActive: setActiveTab }}
          options={[{ label: 'Visão Consolidado' }, { label: 'Visão Colaborador' }]}
        />
      </S.TabsWrap>

      <S.TableWrap>
        <Toolbar
          filters={toolbarFilters}
          search={{ search, setSearch }}
          loading={false}
          reloader={reload}
          pagination={{ setPage, isLastPage, paginator }}
          after={
            activeTab === 0 ? (
              <PeriodPicker value={period} onChange={setPeriod} />
            ) : activeTab === 1 ? (
              <MonthPicker value={month} onChange={setMonth} />
            ) : undefined
          }
        >
          <MwButton size='small' content='Extrair Dados' onClick={onClickExtractData} />
        </Toolbar>

        <MwManager
          columns={columns}
          rows={rows}
          sort={{ sort, setSort }}
          hasFilters={appliedFilters.length > 0 || search.length > 0}
          loading={false}
          paginator={paginator}
          page={page}
          setPage={setPage}
        />

        <ManagerCounter partial={rows.length} total={totalRegistries} />
      </S.TableWrap>
    </S.Wrapper>
  )
}

export default Card13DetailManager
