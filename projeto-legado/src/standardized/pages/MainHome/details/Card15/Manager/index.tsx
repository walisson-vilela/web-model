import React, { useMemo, useState } from 'react'

import { MwManager, Toolbar } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'

import ManagerColumnPopup from '../../../../../../components/ManagerColumnPopup'
import ManagerCounter from '../../../../../../components/ManagerCounter'
import type { ManagerProps } from '../../../../../../screens/interfaces'

import filters from './filters'
import header from './header'
import type { DataInterface, ModelStoreScoreDetail } from './interfaces'

const formatScore = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)

type NotePopupContentProps = {
  details: ModelStoreScoreDetail[]
}

const NotePopupContent = (props: NotePopupContentProps) => {
  const { details } = props

  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return details

    return details.filter((item) => {
      return [
        formatScore(item.score),
        item.performed_by,
        item.role,
        item.collected_at,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [details, query])

  return (
    <div style={{ width: 640, maxWidth: 'calc(100vw - 64px)' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Loja Modelo</div>
          <div style={{ marginTop: 2, fontSize: 12, color: '#6b7280' }}>
            Relação de notas por execução
          </div>
        </div>

        <div style={{ minWidth: 220, position: 'relative' }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Pesquisar'
            style={{
              width: '100%',
              height: 36,
              padding: '0 36px 0 12px',
              borderRadius: 6,
              border: '1px solid #e5e7eb',
              outline: 'none',
              color: '#111827',
            }}
          />
          <i
            className='search icon'
            aria-hidden='true'
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              margin: 0,
            }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          display: 'grid',
          gridTemplateColumns: '90px 1.2fr 1fr 160px',
          gap: 12,
          fontWeight: 700,
          color: '#374151',
          padding: '10px 12px',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div>Nota</div>
        <div>Realizado por</div>
        <div>Função</div>
        <div>Data/Hora Coleta</div>
      </div>

      <div style={{ maxHeight: 260, overflow: 'auto' }}>
        {filtered.map((item, index) => (
          <div
            key={`${item.collected_at}-${item.performed_by}-${index}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '90px 1.2fr 1fr 160px',
              gap: 12,
              padding: '10px 12px',
              borderBottom: '1px solid #f3f4f6',
              color: '#111827',
            }}
          >
            <div style={{ fontWeight: 600 }}>{formatScore(item.score)}</div>
            <div>{item.performed_by}</div>
            <div>{item.role}</div>
            <div>{item.collected_at}</div>
          </div>
        ))}

        {filtered.length === 0 ? (
          <div style={{ padding: 12, color: '#6b7280' }}>Nenhum registro encontrado.</div>
        ) : null}
      </div>
    </div>
  )
}

const ScoreCell = (props: { value: number; details: ModelStoreScoreDetail[] }) => {
  const { value, details } = props

  const trigger = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        fontWeight: 400,
      }}
      aria-label='Ver nota Loja Modelo'
    >
      {formatScore(value)}
    </span>
  )

  return (
    <ManagerColumnPopup
      on='click'
      position='left center'
      offset={[12, 0]}
      trigger={trigger}
      triggerDisplay='inline'
      getContent={async () => <NotePopupContent details={details} />}
    />
  )
}

const MOCK_ROWS: DataInterface[] = [
  {
    id: 102035,
    pdv_name: 'Verdemar - Savassi',
    group: 'Verdemar',
    network: 'Verdemar',
    flag: 'Supermercado',
    cycle: '1°/2025',
    period: '01/01/25 a 31/01/25',
    model_store_score: 8.1,
    executor: '221060 - Rachel Patel',
    supervisor: '221060 - Jeremy Ramirez',
    model_store_details: [
      {
        score: 8.1,
        performed_by: 'Rachel Patel',
        role: 'Promotor',
        collected_at: '31/01/2025 10:12',
      },
      {
        score: 8.0,
        performed_by: 'Rachel Patel',
        role: 'Promotor',
        collected_at: '15/01/2025 14:40',
      },
    ],
  },
  {
    id: 102036,
    pdv_name: 'Supermercado BH C...',
    group: 'BH',
    network: 'BH',
    flag: 'Supermercado',
    cycle: '1°/2025',
    period: '01/01/25 a 31/01/25',
    model_store_score: 8.0,
    executor: '251777 - Carlos Soares',
    supervisor: '231565 - George Williamson',
    model_store_details: [
      {
        score: 8.0,
        performed_by: 'Carlos Soares',
        role: 'Promotor',
        collected_at: '30/01/2025 09:05',
      },
      {
        score: 7.8,
        performed_by: 'Carlos Soares',
        role: 'Promotor',
        collected_at: '10/01/2025 16:22',
      },
      {
        score: 8.2,
        performed_by: 'Carlos Soares',
        role: 'Promotor',
        collected_at: '03/01/2025 11:10',
      },
    ],
  },
  {
    id: 102037,
    pdv_name: 'Supernosso - Savassi',
    group: 'Supernosso',
    network: 'Supernosso',
    flag: 'Supernosso Gourmet',
    cycle: '1°/2025',
    period: '01/01/25 a 31/01/25',
    model_store_score: 9.5,
    executor: '231565 - Julie Adams',
    supervisor: '201535 - Eudes Martins',
    model_store_details: [
      {
        score: 9.5,
        performed_by: 'Julie Adams',
        role: 'Supervisora',
        collected_at: '29/01/2025 13:55',
      },
    ],
  },
  {
    id: 102038,
    pdv_name: 'Extra Hiper Eld...',
    group: 'GPA - Grupo Pão de açucar',
    network: 'Pão de Açúcar',
    flag: 'Hipermercado',
    cycle: '1°/2025',
    period: '01/01/25 a 31/01/25',
    model_store_score: 8.5,
    executor: '241543 - Jô Licon',
    supervisor: '231565 - George Williamson',
    model_store_details: [
      {
        score: 8.5,
        performed_by: 'Jô Licon',
        role: 'Promotor',
        collected_at: '28/01/2025 08:30',
      },
      {
        score: 8.1,
        performed_by: 'Jô Licon',
        role: 'Promotor',
        collected_at: '05/01/2025 15:18',
      },
    ],
  },
  {
    id: 102039,
    pdv_name: 'Supernosso - Eld...',
    group: 'Supernosso',
    network: 'Supernosso',
    flag: 'Supernosso Gourmet',
    cycle: '1°/2025',
    period: '01/01/25 a 31/01/25',
    model_store_score: 8.3,
    executor: '221060 - Rachel Patel',
    supervisor: '221060 - Jeremy Ramirez',
    model_store_details: [
      {
        score: 8.3,
        performed_by: 'Rachel Patel',
        role: 'Promotor',
        collected_at: '27/01/2025 10:12',
      },
    ],
  },
  {
    id: 102040,
    pdv_name: 'Extra Hiper C...',
    group: 'GPA - Grupo Pão de açucar',
    network: 'Pão de Açúcar',
    flag: 'Hipermercado',
    cycle: '1°/2025',
    period: '01/01/25 a 31/01/25',
    model_store_score: 5.3,
    executor: '251777 - Carlos Soares',
    supervisor: '231565 - George Williamson',
    model_store_details: [
      {
        score: 5.3,
        performed_by: 'Carlos Soares',
        role: 'Promotor',
        collected_at: '25/01/2025 09:05',
      },
    ],
  },
  {
    id: 102041,
    pdv_name: 'Supermercado BH Eld...',
    group: 'BH',
    network: 'BH',
    flag: 'Supermercado',
    cycle: '1°/2025',
    period: '01/01/25 a 31/01/25',
    model_store_score: 8.0,
    executor: '231565 - Julie Adams',
    supervisor: '201535 - Eudes Martins',
    model_store_details: [
      {
        score: 8.0,
        performed_by: 'Julie Adams',
        role: 'Supervisora',
        collected_at: '24/01/2025 13:55',
      },
    ],
  },
]

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
        return [String(r.id), r.pdv_name, r.group, r.network, r.flag]
          .join(' ')
          .toLowerCase()
          .includes(q)
      })
    }

    for (let i = 0; i < appliedFilters.length; i++) {
      const { name, value } = { ...appliedFilters[i] }

      if (name === 'group') rows = rows.filter((r) => r.group === value)
      if (name === 'network') rows = rows.filter((r) => r.network === value)
      if (name === 'flag') rows = rows.filter((r) => r.flag === value)
      if (name === 'executor') rows = rows.filter((r) => r.executor === value)
      if (name === 'supervisor') {
        rows = rows.filter((r) => r.supervisor === value)
      }
    }

    return rows
  }, [appliedFilters, search])

  const body = useMemo(() => {
    return data.map((row) => ({
      id: row.id,
      pdv_name: row.pdv_name,
      group: row.group,
      network: row.network,
      flag: row.flag,
      cycle: row.cycle,
      period: row.period,
      model_store_score: (
        <ScoreCell value={row.model_store_score} details={row.model_store_details} />
      ),
    }))
  }, [data])

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
