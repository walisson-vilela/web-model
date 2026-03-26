import React, { useMemo, useState } from 'react'

import type { FiltersInterfaces } from '@mw-kit/mw-manager'
import { MwManager, Toolbar } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'

import ManagerCounter from '../../../../../../components/ManagerCounter'
import type { ManagerProps } from '../../../../../../screens/interfaces'

import filters from './filters'
import header from './header'
import type { BodyInterface, DataInterface } from './interfaces'

const MOCK_ROWS: DataInterface[] = [
  {
    store: 'Verdemar - Savassi',
    route_name: 'Rota SP 1011',
    origin: 'Carteira',
    executor: 'Rachel Patel',
    justification: 'Atestado médico',
    occurrence_date: '01/10/2020',
    total_days: 5,
    supervisor: 'Jeremy Ramirez',
    group: 'Grupo A',
    network: 'Rede 1',
    flag: 'Supermercado',
  },
  {
    store: 'Hipermercado Extra C...',
    route_name: 'Rota MG 001',
    origin: 'Rota',
    executor: 'Julie Adams',
    justification: 'Loja Fechada',
    occurrence_date: '01/10/2020',
    total_days: 3,
    supervisor: 'George Williamson',
    group: 'Grupo B',
    network: 'Rede 2',
    flag: 'Hipermercado',
  },
  {
    store: 'Extra Eldorado',
    route_name: 'Rota 104562',
    origin: 'Rota',
    executor: 'Jô Licon',
    justification: 'Reunião',
    occurrence_date: '30/09/2020',
    total_days: 2,
    supervisor: 'George Williamson',
    group: 'Grupo B',
    network: 'Rede 2',
    flag: 'Hipermercado',
  },
  {
    store: 'Supernosso - Contagem',
    route_name: 'Rota MG 15245',
    origin: 'Rota',
    executor: 'Carlos Soares',
    justification: 'Alteração de Roteiro',
    occurrence_date: '01/10/2020',
    total_days: 5,
    supervisor: 'George Williamson',
    group: 'Grupo B',
    network: 'Rede 2',
    flag: 'Supernosso Gourmet',
  },
  {
    store: 'Supermercado BH C...',
    route_name: 'Rota MG 541',
    origin: 'Rota',
    executor: 'Marina Silva',
    justification: 'PDV fora da carteira do promotor',
    occurrence_date: '01/10/2020',
    total_days: 7,
    supervisor: 'George Williamson',
    group: 'Grupo B',
    network: 'Rede 2',
    flag: 'Supermercado',
  },
  {
    store: 'Lojas Apoio Castelo',
    route_name: 'Rota 104562',
    origin: 'Carteira Foco',
    executor: 'Cristiano Sampaio',
    justification: 'Atestado médico',
    occurrence_date: '01/10/2020',
    total_days: 5,
    supervisor: 'Jeremy Ramirez',
    group: 'Grupo A',
    network: 'Rede 1',
    flag: 'Supermercado',
  },
  {
    store: 'Assai Contagem',
    route_name: 'Rota 104562',
    origin: 'Carteira',
    executor: 'Carme Adams',
    justification: 'Atestado médico',
    occurrence_date: '01/10/2020',
    total_days: 3,
    supervisor: 'Jeremy Ramirez',
    group: 'Grupo A',
    network: 'Rede 1',
    flag: 'Hipermercado',
  },
]

const applyClientFilters = (
  rows: DataInterface[],
  appliedFilters: FiltersInterfaces.AppliedFilter[],
) => {
  let result = [...rows]

  for (let i = 0; i < appliedFilters.length; i++) {
    const { name, value } = { ...appliedFilters[i] }

    if (name === 'supervisor') result = result.filter((r) => r.supervisor === value)
    if (name === 'group') result = result.filter((r) => r.group === value)
    if (name === 'network') result = result.filter((r) => r.network === value)
    if (name === 'flag') result = result.filter((r) => r.flag === value)
    if (name === 'justification') result = result.filter((r) => r.justification === value)
  }

  return result
}

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [page, setPage] = useState<number>(1)
  const [isLastPage] = useState<boolean>(true)

  const data = useMemo(() => {
    let rows = [...MOCK_ROWS]

    if (search.trim().length > 0) {
      const q = search.trim().toLowerCase()
      rows = rows.filter((r) => {
        return [
          r.store,
          r.route_name,
          r.origin,
          r.executor,
          r.justification,
          r.occurrence_date,
          String(r.total_days),
        ]
          .join(' ')
          .toLowerCase()
          .includes(q)
      })
    }

    rows = applyClientFilters(rows, appliedFilters)

    return rows
  }, [appliedFilters, search])

  const body: BodyInterface[] = useMemo(
    () =>
      data.map((row) => ({
        store: row.store,
        route_name: row.route_name,
        origin: row.origin,
        executor: row.executor,
        justification: row.justification,
        occurrence_date: row.occurrence_date,
        total_days: row.total_days,
      })),
    [data],
  )

  const paginator = () => {
    // Mantemos apenas uma página por enquanto.
  }

  const reload = () => {
    // Quando a API for definida, este método será responsável por recarregar os dados.
  }

  const onClickExtractData = () => {
    // A integração da extração de dados será implementada quando o contrato da API estiver definido.
  }

  return (
    <React.Fragment>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={false}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      >
        <MwButton size='small' content='Extrair Dados' onClick={onClickExtractData} />
      </Toolbar>

      <MwManager
        columns={header}
        rows={body}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={false}
        paginator={paginator}
        page={page}
        setPage={setPage}
      />

      <ManagerCounter partial={body.length} total={MOCK_ROWS.length} />
    </React.Fragment>
  )
}

export default Manager
