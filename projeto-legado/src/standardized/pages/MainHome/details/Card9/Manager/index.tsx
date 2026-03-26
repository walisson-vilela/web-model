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

const WithDot = (props: { color: string; label: string }) => {
  const { color, label } = props

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Dot color={color} />
      <span>{label}</span>
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
      role: 'Promotor',
      status: <WithDot color='#62C462' label='Ativo' />,
      supervisor: 'Jeremy Ramirez',
      last_notification: 'Hoje as 10:20:30',
      classification: <WithDot color='#62C462' label='Feliz' />,
      observation: '-',
    },
    {
      name: 'Julie Adams',
      role: 'Promotor',
      status: <WithDot color='#62C462' label='Ativo' />,
      supervisor: 'George Willimson',
      last_notification: 'Hoje as 10:20:30',
      classification: <WithDot color='#62C462' label='Motivado' />,
      observation: 'Empresa do mal',
    },
    {
      name: 'Jô Licon',
      role: 'Promotor',
      status: <WithDot color='#E23851' label='Inativo' />,
      supervisor: 'George Willimson',
      last_notification: 'Hoje as 10:20:30',
      classification: <WithDot color='#E23851' label='Doente' />,
      observation: 'Esse encarregado não quis ajudar',
    },
    {
      name: 'Carlos Soares',
      role: 'Promotor',
      status: <WithDot color='#E23851' label='Inativo' />,
      supervisor: 'George Willimson',
      last_notification: 'Ontem as 10:20:30',
      classification: <WithDot color='#F0AD4E' label='Estressado' />,
      observation: 'Muitas lojas e muitos problemas',
    },
    {
      name: 'Amanda Join',
      role: 'Promotor',
      status: <WithDot color='#62C462' label='Ativo' />,
      supervisor: 'George Willimson',
      last_notification: 'Hoje as 10:20:30',
      classification: <WithDot color='#E23851' label='Triste' />,
      observation: 'Muitas lojas',
    },
    {
      name: 'Cristiano Sampaio',
      role: 'Promotor',
      status: <WithDot color='#E23851' label='Inativo' />,
      supervisor: 'George Willimson',
      last_notification: '06/12/20 - 10:20:30',
      classification: <WithDot color='#F0AD4E' label='Não Valorizado' />,
      observation: 'Muitas lojas',
    },
    {
      name: 'Carme Adams',
      role: 'Promotor',
      status: <WithDot color='#62C462' label='Ativo' />,
      supervisor: 'George Willimson',
      last_notification: '-',
      classification: '-',
      observation: '-',
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
