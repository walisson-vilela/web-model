import React, { useMemo, useState } from 'react'

import { MwManager, Toolbar, type SortState } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import ManagerCounter from '../../../../../../components/ManagerCounter'
import { ManagerProps } from '../../../../../../screens/interfaces'

import filters from './filters'
import header from './header'
import type { BodyInterface } from './interfaces'

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

const ImpactCell = (props: { label: string; color: string }) => {
  const { label, color } = props

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Dot color={color} />
      <span>{label}</span>
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

const ExecutorCell = (props: { name: string }) => {
  const { name } = props

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Dot color='#62C462' />
      <span>{name}</span>
    </span>
  )
}

const DayTooltip = (props: { dateLabel: string; planned: string }) => {
  const { dateLabel, planned } = props

  return (
    <div style={{ minWidth: 190, lineHeight: 1.4 }}>
      <div style={{ fontWeight: 600, marginBottom: 10 }}>{dateLabel}</div>
      <div>Quantidade de Atendimentos</div>
      <div>Previstos: {planned}</div>
    </div>
  )
}

const DayValue = (props: { value: number; dateLabel: string; planned: string }) => {
  const { value, dateLabel, planned } = props

  const color = value > 100 ? '#E23851' : value >= 75 ? '#129105' : '#263046'

  return (
    <Popup
      on='hover'
      position='bottom center'
      inverted
      trigger={<span style={{ color, cursor: 'default' }}>{value}%</span>}
      content={<DayTooltip dateLabel={dateLabel} planned={planned} />}
    />
  )
}

const Bar = (props: { value: number; color: string }) => {
  const { value, color } = props

  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          width: 64,
          height: 12,
          border: '1px solid #E5E7EB',
          background: '#FFFFFF',
        }}
      >
        <div style={{ width: `${clamped}%`, height: '100%', background: color }} />
      </div>
      <span>{new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(value)}%</span>
    </div>
  )
}

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [page, setPage] = useState<number>(1)
  const [isLastPage] = useState<boolean>(true)

  const reload = () => {
    // mock
  }

  const paginator = () => {
    // mock
  }

  const onClickExtractData = () => {
    // mock
  }

  const rows = useMemo<BodyInterface[]>(
    () => [
      {
        impact: <ImpactCell label='Baixo' color='#62C462' />,
        route_name: <RouteCell route='Rota MG - 01 e 06 (Tem...)' subtitle='Tipo : Temporário' />,
        supervisor: 'Jeremy Ramirez',
        executor: <ExecutorCell name='Rachel Patel' />,
        d: <span style={{ color: '#263046' }}>-%</span>,
        s: <DayValue value={100} dateLabel='Segunda-Feira 17/06/2021' planned='05' />,
        t: <DayValue value={100} dateLabel='Terça-Feira 18/06/2021' planned='05' />,
        q1: <DayValue value={100} dateLabel='Quarta-Feira 19/06/2021' planned='05' />,
        q2: <DayValue value={100} dateLabel='Quinta-Feira 20/06/2021' planned='05' />,
        s1: <DayValue value={100} dateLabel='Sexta-Feira 21/06/2021' planned='05' />,
        s2: <DayValue value={100} dateLabel='Sábado 22/06/2021' planned='05' />,
        tmo_plus: <Bar value={100} color='#62C462' />,
        tmo_minus: <Bar value={0} color='#E23851' />,
      },
      {
        impact: <ImpactCell label='Moderado' color='#F0AD4E' />,
        route_name: <RouteCell route='Rota MG - 02 (Cobertura)' subtitle='Tipo : Temporário' />,
        supervisor: 'George Williamson',
        executor: <ExecutorCell name='Julie Adams' />,
        d: <span style={{ color: '#263046' }}>-%</span>,
        s: <DayValue value={88} dateLabel='Segunda-Feira 17/06/2021' planned='05' />,
        t: <DayValue value={75} dateLabel='Terça-Feira 18/06/2021' planned='05' />,
        q1: <DayValue value={113} dateLabel='Quarta-Feira 19/06/2021' planned='05' />,
        q2: <DayValue value={106} dateLabel='Quinta-Feira 20/06/2021' planned='05' />,
        s1: <span style={{ color: '#263046' }}>63%</span>,
        s2: <DayValue value={125} dateLabel='Sábado 22/06/2021' planned='05' />,
        tmo_plus: <Bar value={86.36} color='#62C462' />,
        tmo_minus: <Bar value={5.68} color='#E23851' />,
      },
      {
        impact: <ImpactCell label='Baixo' color='#62C462' />,
        route_name: <RouteCell route='Rota MG - 07' subtitle='Roteiro: Fixo' />,
        supervisor: 'George Williamson',
        executor: <ExecutorCell name='Jô Licon' />,
        d: <span style={{ color: '#263046' }}>-%</span>,
        s: <DayValue value={94} dateLabel='Segunda-Feira 17/06/2021' planned='05' />,
        t: <DayValue value={94} dateLabel='Terça-Feira 18/06/2021' planned='05' />,
        q1: <DayValue value={94} dateLabel='Quarta-Feira 19/06/2021' planned='05' />,
        q2: <DayValue value={94} dateLabel='Quinta-Feira 20/06/2021' planned='05' />,
        s1: <DayValue value={94} dateLabel='Sexta-Feira 21/06/2021' planned='05' />,
        s2: <DayValue value={125} dateLabel='Sábado 22/06/2021' planned='05' />,
        tmo_plus: <Bar value={94.32} color='#62C462' />,
        tmo_minus: <Bar value={2.27} color='#E23851' />,
      },
      {
        impact: <ImpactCell label='Alto' color='#E23851' />,
        route_name: <RouteCell route='Rota MG - 08' subtitle='Roteiro: Fixo' />,
        supervisor: 'George Williamson',
        executor: <ExecutorCell name='Carlos Soares' />,
        d: <span style={{ color: '#263046' }}>-%</span>,
        s: <DayValue value={138} dateLabel='Segunda-Feira 17/06/2021' planned='05' />,
        t: <DayValue value={88} dateLabel='Terça-Feira 18/06/2021' planned='05' />,
        q1: <DayValue value={138} dateLabel='Quarta-Feira 19/06/2021' planned='05' />,
        q2: <DayValue value={88} dateLabel='Quinta-Feira 20/06/2021' planned='05' />,
        s1: <DayValue value={138} dateLabel='Sexta-Feira 21/06/2021' planned='05' />,
        s2: <DayValue value={75} dateLabel='Sábado 22/06/2021' planned='05' />,
        tmo_plus: <Bar value={93.18} color='#62C462' />,
        tmo_minus: <Bar value={20.45} color='#E23851' />,
      },
      {
        impact: <ImpactCell label='Alto' color='#E23851' />,
        route_name: <RouteCell route='Rota MG - 09' subtitle='Roteiro: Fixo' />,
        supervisor: 'George Williamson',
        executor: <ExecutorCell name='Marina Silva' />,
        d: <span style={{ color: '#263046' }}>-%</span>,
        s: <span style={{ color: '#263046' }}>63%</span>,
        t: <span style={{ color: '#263046' }}>63%</span>,
        q1: <span style={{ color: '#263046' }}>63%</span>,
        q2: <span style={{ color: '#263046' }}>63%</span>,
        s1: <DayValue value={125} dateLabel='Sexta-Feira 21/06/2021' planned='05' />,
        s2: <span style={{ color: '#263046' }}>-</span>,
        tmo_plus: <Bar value={65.91} color='#62C462' />,
        tmo_minus: <Bar value={2.27} color='#E23851' />,
      },
      {
        impact: <ImpactCell label='Alto' color='#E23851' />,
        route_name: <RouteCell route='Rota MG - 10' subtitle='Roteiro: Fixo' />,
        supervisor: 'George Williamson',
        executor: <ExecutorCell name='Cristiano Sampaio' />,
        d: <span style={{ color: '#263046' }}>-%</span>,
        s: <DayValue value={113} dateLabel='Segunda-Feira 17/06/2021' planned='05' />,
        t: <DayValue value={113} dateLabel='Terça-Feira 18/06/2021' planned='05' />,
        q1: <DayValue value={113} dateLabel='Quarta-Feira 19/06/2021' planned='05' />,
        q2: <DayValue value={113} dateLabel='Quinta-Feira 20/06/2021' planned='05' />,
        s1: <DayValue value={113} dateLabel='Sexta-Feira 21/06/2021' planned='05' />,
        s2: <DayValue value={75} dateLabel='Sábado 22/06/2021' planned='05' />,
        tmo_plus: <Bar value={97.73} color='#62C462' />,
        tmo_minus: <Bar value={11.36} color='#E23851' />,
      },
      {
        impact: <ImpactCell label='Alto' color='#E23851' />,
        route_name: <RouteCell route='Rota MG - 11' subtitle='Roteiro: Fixo' />,
        supervisor: 'George Williamson',
        executor: <ExecutorCell name='Carme Adams' />,
        d: <span style={{ color: '#263046' }}>-%</span>,
        s: <span style={{ color: '#263046' }}>38%</span>,
        t: <span style={{ color: '#263046' }}>38%</span>,
        q1: <span style={{ color: '#263046' }}>38%</span>,
        q2: <span style={{ color: '#263046' }}>38%</span>,
        s1: <span style={{ color: '#263046' }}>25%</span>,
        s2: <span style={{ color: '#263046' }}>-</span>,
        tmo_plus: <Bar value={36.36} color='#62C462' />,
        tmo_minus: <Bar value={0} color='#E23851' />,
      },
    ],
    [],
  )

  const totalRegistries = rows.length

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
