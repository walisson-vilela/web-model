import React, { useState } from 'react'

import { MwManager, Toolbar } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import Bullet from '../../../../../../components/Bullet'
import ManagerCounter from '../../../../../../components/ManagerCounter'
import { ManagerProps } from '../../../../../../screens/interfaces'

import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'
import { status as statusLabels, systemActivity } from './labels'

const SystemActivityTooltipContent = () => {
  return (
    <div style={{ minWidth: 240 }}>
      <div style={{ fontSize: 13, opacity: 0.95, marginBottom: 10 }}>
        Data da analise: 15/01/2021
      </div>
      <div style={{ fontSize: 13, opacity: 0.95 }}>Percentual de falhas</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 8,
          marginTop: 2,
        }}
      >
        <span style={{ fontSize: 28, fontWeight: 700 }}>53,2%</span>
        <span style={{ fontSize: 14, opacity: 0.95 }}>(53/100)</span>
      </div>
    </div>
  )
}

const SystemActivityCell = (props: { label: string; color: string }) => {
  const { label, color } = props

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}
    >
      <span>{label}</span>
      <Popup
        on='hover'
        position='left center'
        offset={[12, 0]}
        style={{ maxWidth: 'unset' }}
        inverted
        trigger={
          <span
            aria-label='Detalhes da atividade sistêmica'
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: color,
              flex: '0 0 auto',
              display: 'inline-block',
              cursor: 'pointer',
            }}
          />
        }
        content={<SystemActivityTooltipContent />}
      />
    </div>
  )
}

const MOCK_ROWS: BodyInterface[] = [
  {
    name: 'Rachel Patel',
    status: 'active',
    status_label: (
      <Bullet
        content={statusLabels.active.name}
        color={statusLabels.active.color}
      />
    ),
    supervisor: 'Jeremy Ramirez',
    hierarchy: 'Supervisão SP1',
    first_battery_day: '-',
    current_reading: '-',
    avg_consumption: '-',
    system_activity_label: (
      <SystemActivityCell label={systemActivity.none.name} color={systemActivity.none.color} />
    ),
  },
  {
    name: 'Julie Adams',
    status: 'active',
    status_label: (
      <Bullet
        content={statusLabels.active.name}
        color={statusLabels.active.color}
      />
    ),
    supervisor: 'George Williamson',
    hierarchy: 'Supervisão MG1',
    first_battery_day: '07:10:00 - 100%',
    current_reading: '10:20:30 - 98%',
    avg_consumption: '30% por hora',
    system_activity_label: (
      <SystemActivityCell label={systemActivity.low.name} color={systemActivity.low.color} />
    ),
  },
  {
    name: 'Jô Licon',
    status: 'active',
    status_label: (
      <Bullet
        content={statusLabels.active.name}
        color={statusLabels.active.color}
      />
    ),
    supervisor: 'George Williamson',
    hierarchy: 'Supervisão MG1',
    first_battery_day: '10:20:30 - 52%',
    current_reading: '10:20:30 - 98%',
    avg_consumption: '30% por hora',
    system_activity_label: (
      <SystemActivityCell
        label={systemActivity.moderate.name}
        color={systemActivity.moderate.color}
      />
    ),
  },
  {
    name: 'Carlos Soares',
    status: 'active',
    status_label: (
      <Bullet
        content={statusLabels.active.name}
        color={statusLabels.active.color}
      />
    ),
    supervisor: 'George Williamson',
    hierarchy: 'Supervisão MG1',
    first_battery_day: '10:20:30 - 98%',
    current_reading: '10:20:30 - 98%',
    avg_consumption: '-',
    system_activity_label: (
      <SystemActivityCell label={systemActivity.none.name} color={systemActivity.none.color} />
    ),
  },
  {
    name: 'Carlos Soares',
    status: 'active',
    status_label: (
      <Bullet
        content={statusLabels.active.name}
        color={statusLabels.active.color}
      />
    ),
    supervisor: 'George Williamson',
    hierarchy: 'Supervisão MG1',
    first_battery_day: '10:20:30 - 98%',
    current_reading: '10:20:30 - 98%',
    avg_consumption: '30% por hora',
    system_activity_label: (
      <SystemActivityCell label={systemActivity.high.name} color={systemActivity.high.color} />
    ),
  },
  {
    name: 'Cristiano Sampaio',
    status: 'active',
    status_label: (
      <Bullet
        content={statusLabels.active.name}
        color={statusLabels.active.color}
      />
    ),
    supervisor: 'George Williamson',
    hierarchy: 'Supervisão MG1',
    first_battery_day: '10:20:30 - 98%',
    current_reading: '10:20:30 - 98%',
    avg_consumption: '10% por hora',
    system_activity_label: (
      <SystemActivityCell label={systemActivity.high.name} color={systemActivity.high.color} />
    ),
  },
  {
    name: 'Carme Adams',
    status: 'active',
    status_label: (
      <Bullet
        content={statusLabels.active.name}
        color={statusLabels.active.color}
      />
    ),
    supervisor: 'George Williamson',
    hierarchy: 'Supervisão GO1',
    first_battery_day: '10:20:30 - 98%',
    current_reading: '10:20:30 - 98%',
    avg_consumption: '5,3 % por hora',
    system_activity_label: (
      <SystemActivityCell label={systemActivity.low.name} color={systemActivity.low.color} />
    ),
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
        <MwButton
          size='small'
          content='Extrair Dados'
          onClick={onClickExtractData}
        />
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
