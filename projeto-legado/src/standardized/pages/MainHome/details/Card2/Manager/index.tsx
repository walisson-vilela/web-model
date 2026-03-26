import React, { useState } from 'react'

import { MwManager, Toolbar } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'

import Bullet from '../../../../../../components/Bullet'
import ManagerCounter from '../../../../../../components/ManagerCounter'
import { ManagerProps } from '../../../../../../screens/interfaces'

import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'
import { status as statusLabels } from './labels'

const MOCK_ROWS: BodyInterface[] = [
  {
    name: 'Rachel Patel',
    status: 'active',
    status_label: (
      <Bullet content={statusLabels.active.name} color={statusLabels.active.color} />
    ),
    supervisor: 'Jeremy Ramirez',
    hierarchy: 'Supervisão SP1',
    route_name: 'Rota SP 1011',
    pdvs_day: 3,
    wallet: 'Sim',
    planned_route: 'Sim',
  },
  {
    name: 'Julie Adams',
    status: 'active',
    status_label: (
      <Bullet content={statusLabels.active.name} color={statusLabels.active.color} />
    ),
    supervisor: 'George Williamson',
    hierarchy: 'Supervisão MG1',
    route_name: 'Rota MG 001',
    pdvs_day: 5,
    wallet: 'Sim',
    planned_route: 'Não',
  },
  {
    name: 'Jô Licon',
    status: 'active',
    status_label: (
      <Bullet content={statusLabels.active.name} color={statusLabels.active.color} />
    ),
    supervisor: 'George Williamson',
    hierarchy: 'Supervisão MG1',
    route_name: 'Rota MG 001',
    pdvs_day: 2,
    wallet: 'Sim',
    planned_route: 'Não',
  },
  {
    name: 'Carlos Soares',
    status: 'active',
    status_label: (
      <Bullet content={statusLabels.active.name} color={statusLabels.active.color} />
    ),
    supervisor: 'George Williamson',
    hierarchy: 'Supervisão MG1',
    route_name: 'Rota MG 15245',
    pdvs_day: 7,
    wallet: 'Sim',
    planned_route: 'Sim',
  },
  {
    name: 'Carlos Soares',
    status: 'active',
    status_label: (
      <Bullet content={statusLabels.active.name} color={statusLabels.active.color} />
    ),
    supervisor: 'George Williamson',
    hierarchy: 'Supervisão MG1',
    route_name: 'Rota MG 541',
    pdvs_day: 8,
    wallet: 'Sim',
    planned_route: 'Sim',
  },
  {
    name: 'Cristiano Sampaio',
    status: 'active',
    status_label: (
      <Bullet content={statusLabels.active.name} color={statusLabels.active.color} />
    ),
    supervisor: 'George Williamson',
    hierarchy: 'Supervisão MG1',
    route_name: 'Rota 104562',
    pdvs_day: 3,
    wallet: 'Sim',
    planned_route: 'Sim',
  },
  {
    name: 'Carme Adams',
    status: 'active',
    status_label: (
      <Bullet content={statusLabels.active.name} color={statusLabels.active.color} />
    ),
    supervisor: 'George Williamson',
    hierarchy: 'Supervisão GO1',
    route_name: 'Rota MG 001',
    pdvs_day: 5,
    wallet: 'Sim',
    planned_route: 'Sim',
  },
]

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [body] = useState<BodyInterface[]>(MOCK_ROWS)
  const [page, setPage] = useState<number>(1)
  const [isLastPage] = useState<boolean>(true)
  const [totalRegistries] = useState<number>(MOCK_ROWS.length)

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

      <ManagerCounter partial={body.length} total={totalRegistries} />
    </React.Fragment>
  )
}

export default Manager
