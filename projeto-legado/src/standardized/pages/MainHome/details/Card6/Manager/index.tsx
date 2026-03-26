import React, { useState } from 'react'

import { MwManager, Toolbar } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'

import ManagerCounter from '../../../../../../components/ManagerCounter'
import { ManagerProps } from '../../../../../../screens/interfaces'

import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'

type DotProps = {
  color: string
  size?: number
}

const Dot = (props: DotProps) => {
  const { color, size = 10 } = props

  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: 999,
        backgroundColor: color,
        verticalAlign: 'middle',
      }}
    />
  )
}

const StatusCell = (props: { label: string }) => {
  const { label } = props

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Dot color='#62C462' size={6} />
      <span>{label}</span>
    </span>
  )
}

const ConnectionLevelCell = (props: { label: string; color: string }) => {
  const { label, color } = props

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 90,
      }}
    >
      <span>{label}</span>
      <Dot color={color} />
    </span>
  )
}

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const rows: BodyInterface[] = [
    {
      name: 'Rachel Patel',
      status: <StatusCell label='Ativo' />,
      supervisor: 'Jeremy Ramirez',
      hierarchy: 'Supervisão SP1',
      connection_type: 'Wifi',
      notification_date: 'Hoje as 10:20:30',
      images: '05',
      data: '05',
      connection_level: <ConnectionLevelCell label='-' color='#D7D7D7' />,
    },
    {
      name: 'Julie Adams',
      status: <StatusCell label='Ativo' />,
      supervisor: 'George Williamson',
      hierarchy: 'Supervisão MG1',
      connection_type: 'Rede Movel',
      notification_date: 'Hoje as 10:20:30',
      images: '-',
      data: '-',
      connection_level: <ConnectionLevelCell label='Boa' color='#62C462' />,
    },
    {
      name: 'Jô Licon',
      status: <StatusCell label='Ativo' />,
      supervisor: 'George Williamson',
      hierarchy: 'Supervisão MG1',
      connection_type: 'Rede Movel',
      notification_date: 'Hoje as 10:20:30',
      images: '05',
      data: '05',
      connection_level: <ConnectionLevelCell label='Moderada' color='#F0AD4E' />,
    },
    {
      name: 'Carlos Soares',
      status: <StatusCell label='Ativo' />,
      supervisor: 'George Williamson',
      hierarchy: 'Supervisão MG1',
      connection_type: 'Rede Movel',
      notification_date: 'Ontem as 10:20:30',
      images: '05',
      data: '05',
      connection_level: <ConnectionLevelCell label='-' color='#D7D7D7' />,
    },
    {
      name: 'Marina Silva',
      status: <StatusCell label='Ativo' />,
      supervisor: 'George Williamson',
      hierarchy: 'Supervisão MG1',
      connection_type: 'Rede Movel',
      notification_date: 'Hoje as 10:20:30',
      images: '-',
      data: '-',
      connection_level: <ConnectionLevelCell label='Ruim' color='#E74C3C' />,
    },
    {
      name: 'Cristiano Sampaio',
      status: <StatusCell label='Ativo' />,
      supervisor: 'George Williamson',
      hierarchy: 'Supervisão MG1',
      connection_type: 'Wifi',
      notification_date: '06/12/20 - 10:20:30',
      images: '05',
      data: '05',
      connection_level: <ConnectionLevelCell label='Ruim' color='#E74C3C' />,
    },
    {
      name: 'Carme Adams',
      status: <StatusCell label='Ativo' />,
      supervisor: 'George Williamson',
      hierarchy: 'Supervisão GO1',
      connection_type: 'Wifi',
      notification_date: 'Hoje as 10:20:30',
      images: '05',
      data: '05',
      connection_level: <ConnectionLevelCell label='Boa' color='#62C462' />,
    },
    {
      name: 'Carlos Soares da S...',
      status: <StatusCell label='Ativo' />,
      supervisor: 'Jeremy Ramirez',
      hierarchy: 'Supervisão SP1',
      connection_type: 'Wifi',
      notification_date: 'Hoje as 10:20:30',
      images: '05',
      data: '05',
      connection_level: <ConnectionLevelCell label='-' color='#D7D7D7' />,
    },
    {
      name: 'Miguel Lisboa Neto',
      status: <StatusCell label='Ativo' />,
      supervisor: 'George Williamson',
      hierarchy: 'Supervisão MG1',
      connection_type: 'Rede Movel',
      notification_date: 'Hoje as 10:20:30',
      images: '01',
      data: '-',
      connection_level: <ConnectionLevelCell label='Boa' color='#62C462' />,
    },
  ]

  const [page, setPage] = useState<number>(1)
  const [isLastPage] = useState<boolean>(true)
  const [totalRegistries] = useState<number>(rows.length)

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
        rows={rows}
        sort={{ sort, setSort }}
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
