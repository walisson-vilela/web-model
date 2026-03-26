import React, { useState } from 'react'

import {
    MwManager,
    Toolbar,
    type SortState
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'

import ManagerCounter from '../../../../../../components/ManagerCounter'
import { ManagerProps } from '../../../../../../screens/interfaces'

import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'

type DotProps = {
  color: string
}

const Dot = (props: DotProps) => {
  const { color } = props

  return (
    <span
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: 999,
        backgroundColor: color,
        verticalAlign: 'middle',
      }}
    />
  )
}

const StatusCell = (props: { inside: boolean }) => {
  const { inside } = props
  const label = inside ? 'Dentro' : 'Fora'
  const color = inside ? '#62C462' : '#E23851'

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Dot color={color} />
      <span>{label}</span>
    </span>
  )
}

const NameCell = (props: { inside: boolean; name: string }) => {
  const { inside, name } = props
  const color = inside ? '#62C462' : '#E23851'

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Dot color={color} />
      <span>{name}</span>
    </span>
  )
}

const RouteCell = (props: { route: string; subtitle: string }) => {
  const { route, subtitle } = props

  return (
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Dot color='#62C462' />
        <span>{route}</span>
      </div>
      <div style={{ marginLeft: 16, fontSize: 12, color: '#9AA0A6' }}>
        {subtitle}
      </div>
    </div>
  )
}

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [page, setPage] = useState<number>(1)
  const [isLastPage] = useState<boolean>(true)
  const [totalRegistries] = useState<number>(7)

  const paginator = () => {
    // Mantemos apenas uma página por enquanto.
  }

  const reload = () => {
    // Quando a API for definida, este método será responsável por recarregar os dados.
  }

  const onClickExtractData = () => {
    // A integração da extração de dados será implementada quando o contrato da API estiver definido.
  }

  const rows: BodyInterface[] = [
    {
      status: <StatusCell inside />,
      name: <NameCell inside name='Rachel Patel' />,
      supervisor: 'Jeremy Ramirez',
      route_name: (
        <RouteCell
          route='Rota MG - 01 e 06 (Tem...)'
          subtitle='Tipo : Temporário'
        />
      ),
      planned_attendances: 6,
      added_attendances: 1,
      realized_attendances: 7,
      planned_distance: '14,4 km',
      real_distance: '16,8 km',
    },
    {
      status: <StatusCell inside />,
      name: <NameCell inside name='Julie Adams' />,
      supervisor: 'George Willimson',
      route_name: (
        <RouteCell
          route='Rota MG - 02 (Cobertura)'
          subtitle='Tipo : Temporário'
        />
      ),
      planned_attendances: 4,
      added_attendances: 0,
      realized_attendances: 4,
      planned_distance: '30 km',
      real_distance: '30 km',
    },
    {
      status: <StatusCell inside={false} />,
      name: <NameCell inside={false} name='Jô Licon' />,
      supervisor: 'George Willimson',
      route_name: <RouteCell route='Rota MG - 07' subtitle='Roteiro: Fixo' />,
      planned_attendances: 5,
      added_attendances: 2,
      realized_attendances: 7,
      planned_distance: '10,4 km',
      real_distance: '14,56 km',
    },
    {
      status: <StatusCell inside={false} />,
      name: <NameCell inside={false} name='Carlos Soares' />,
      supervisor: 'George Willimson',
      route_name: <RouteCell route='Rota MG - 08' subtitle='Roteiro: Fixo' />,
      planned_attendances: 3,
      added_attendances: 0,
      realized_attendances: 3,
      planned_distance: '8,43 km',
      real_distance: '8,43 km',
    },
    {
      status: <StatusCell inside={false} />,
      name: <NameCell inside={false} name='Marina Silva' />,
      supervisor: 'George Willimson',
      route_name: <RouteCell route='Rota MG - 09' subtitle='Roteiro: Fixo' />,
      planned_attendances: 6,
      added_attendances: 0,
      realized_attendances: 6,
      planned_distance: '15,3 km',
      real_distance: '17,3 km',
    },
    {
      status: <StatusCell inside={false} />,
      name: <NameCell inside={false} name='Cristiano Sampaio' />,
      supervisor: 'George Willimson',
      route_name: <RouteCell route='Rota MG - 10' subtitle='Roteiro: Fixo' />,
      planned_attendances: 5,
      added_attendances: 0,
      realized_attendances: 5,
      planned_distance: '13,9 km',
      real_distance: '12,9 km',
    },
    {
      status: <StatusCell inside />,
      name: <NameCell inside name='Carme Adams' />,
      supervisor: 'George Willimson',
      route_name: <RouteCell route='Rota MG - 11' subtitle='Roteiro: Fixo' />,
      planned_attendances: 4,
      added_attendances: 0,
      realized_attendances: 4,
      planned_distance: '20,8 km',
      real_distance: '20,1 km',
    },
  ]

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
        rows={rows}
        sort={{ sort: sort as SortState | null, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={false}
        paginator={paginator}
        page={page}
        setPage={setPage}
      />

      <ManagerCounter partial={rows.length} total={totalRegistries} />
    </React.Fragment>
  )
}

export default Manager
