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
    people_name: 'Rachel Patel',
    role_name: 'Promotor',
    active: 'active',
    active_jsx: (
      <Bullet content={statusLabels.active.name} color={statusLabels.active.color} />
    ),
    supervisor_name: 'George Williamson',
    supervisor_hierarchy: 'Supervisão MG1',
    attendance_started: 'Sim',
    last_connection: 'Hoje 09:10',
    disconnected_time: '3h e 00 min',
    classification: '4 horas',
  },
  {
    people_name: 'Julie Adams',
    role_name: 'Promotor',
    active: 'active',
    active_jsx: (
      <Bullet content={statusLabels.active.name} color={statusLabels.active.color} />
    ),
    supervisor_name: 'Jeremy Ramirez',
    supervisor_hierarchy: 'Supervisão SP1',
    attendance_started: 'Não',
    last_connection: 'Hoje 08:10',
    disconnected_time: '8h e 30 min',
    classification: '+1 dia',
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
