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
    name: 'Rachel Patel',
    role: 'Promotor',
    supervisor: 'Jeremy Ramirez',
    route_name: 'Rota SP 1011',
    area: 'Minas Gerais...',
    reason: 'Atestado Médico',
    date: '01/10/2020',
    total_days: 5,
  },
  {
    name: 'Julie Adams',
    role: 'Promotor',
    supervisor: 'George Williamson',
    route_name: 'Rota MG 001',
    area: 'Belo Horizonte',
    reason: 'Afastamento',
    date: '01/10/2020',
    total_days: 3,
  },
  {
    name: 'Jô Licon',
    role: 'Promotor',
    supervisor: 'George Williamson',
    route_name: 'Rota 104562',
    area: 'Venda Nova',
    reason: 'Ferias',
    date: '30/09/2020',
    total_days: 2,
  },
  {
    name: 'Carlos Soares',
    role: 'Promotor',
    supervisor: 'George Williamson',
    route_name: 'Rota MG 15245',
    area: 'Interior de Minas',
    reason: 'Ferias',
    date: '01/10/2020',
    total_days: 5,
  },
  {
    name: 'Marina Silva',
    role: 'Promotor',
    supervisor: 'George Williamson',
    route_name: 'Rota MG 541',
    area: 'SP Capital',
    reason: 'Desligamento',
    date: '01/10/2020',
    total_days: 7,
  },
  {
    name: 'Cristiano Sampaio',
    role: 'Promotor',
    supervisor: 'George Williamson',
    route_name: 'Rota 104562',
    area: 'Rio de Janeiro',
    reason: 'Licença Paternidade',
    date: '01/10/2020',
    total_days: 5,
  },
  {
    name: 'Carme Adams',
    role: 'Promotor',
    supervisor: 'George Williamson',
    route_name: 'Rota 104562',
    area: 'Rio de Janeiro',
    reason: 'Atestado Médico',
    date: '01/10/2020',
    total_days: 3,
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
    if (name === 'role') result = result.filter((r) => r.role === value)
    if (name === 'reason') result = result.filter((r) => r.reason === value)
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
          r.name,
          r.role,
          r.supervisor,
          r.route_name,
          r.area,
          r.reason,
          r.date,
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
        name: row.name,
        role: row.role,
        supervisor: row.supervisor,
        route_name: row.route_name,
        area: row.area,
        reason: row.reason,
        date: row.date,
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
