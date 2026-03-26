import React, { useMemo, useState } from 'react'

import type { FiltersInterfaces } from '@mw-kit/mw-manager'
import { MwManager, Toolbar } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'

import ManagerCounter from '../../../../../../components/ManagerCounter'
import Tabs from '../../../../../../components/Tabs'
import type { ManagerProps } from '../../../../../../screens/interfaces'

import { CheckValidationModal } from '../../Card4/Manager/components/Modal'
import { Photo } from '../../Card4/Manager/components/Modal/components'
import { Map } from '../../Card4/Manager/components/Modal/components/Map'
import { CheckFoto } from '../../Card4/Manager/icons'

import filters from './filters'
import { checkInHeader, checkOutHeader } from './header'
import type { BodyInterface, DataInterface } from './interfaces'

type Mode = 'check-in' | 'check-out'

const CHECK_IN_TOTAL = 244
const CHECK_OUT_TOTAL = 98

const CHECK_IN_ROWS: DataInterface[] = [
  {
    pdv: 'Verdemar - Savassi',
    route_name: 'Rota SP 1011',
    origin: 'Carteira',
    executor: 'Rachel Patel',
    check_time: '09:10:21',
    distance: '0,03m',
    supervisor: 'George Williamson',
  },
  {
    pdv: 'Hipermercado Extra C...',
    route_name: 'Rota MG 001',
    origin: 'Rota',
    executor: 'Julie Adams',
    check_time: '09:10:21',
    distance: '1,25m',
    supervisor: 'George Williamson',
  },
  {
    pdv: 'Extra Eldorado',
    route_name: 'Rota 104562',
    origin: 'Rota',
    executor: 'Jô Licon',
    check_time: '09:10:21',
    distance: '10,37m',
    supervisor: 'Jeremy Ramirez',
  },
  {
    pdv: 'Supernosso - Contagem',
    route_name: 'Rota MG 15245',
    origin: 'Rota',
    executor: 'Carlos Soares',
    check_time: '09:10:21',
    distance: '0,07m',
    supervisor: 'Jeremy Ramirez',
  },
  {
    pdv: 'Supermercado BH C...',
    route_name: 'Rota MG 541',
    origin: 'Rota',
    executor: 'Marina Silva',
    check_time: '09:10:21',
    distance: '1,25m',
    supervisor: 'George Williamson',
  },
  {
    pdv: 'Lojas Apoio Castelo',
    route_name: 'Rota 104562',
    origin: 'Carteira',
    executor: 'Cristiano Sampaio',
    check_time: '09:10:21',
    distance: '0,05m',
    supervisor: 'George Williamson',
  },
  {
    pdv: 'Assai Contagem',
    route_name: 'Rota 104562',
    origin: 'Carteira',
    executor: 'Carme Adams',
    check_time: '09:10:21',
    distance: '0,03m',
    supervisor: 'Jeremy Ramirez',
  },
]

const CHECK_OUT_ROWS: DataInterface[] = [
  {
    pdv: 'Verdemar - Savassi',
    route_name: 'Rota SP 1011',
    origin: 'Carteira',
    executor: 'Rachel Patel',
    check_time: '09:10:21',
    distance: '0,03m',
    supervisor: 'George Williamson',
  },
  {
    pdv: 'Hipermercado Extra C...',
    route_name: 'Rota MG 001',
    origin: 'Rota',
    executor: 'Julie Adams',
    check_time: '09:10:21',
    distance: '1,25m',
    supervisor: 'George Williamson',
  },
  {
    pdv: 'Extra Eldorado',
    route_name: 'Rota 104562',
    origin: 'Rota',
    executor: 'Jô Licon',
    check_time: '09:10:21',
    distance: '10,37m',
    supervisor: 'Jeremy Ramirez',
  },
  {
    pdv: 'Supernosso - Contagem',
    route_name: 'Rota MG 15245',
    origin: 'Rota',
    executor: 'Carlos Soares',
    check_time: '09:10:21',
    distance: '0,07m',
    supervisor: 'Jeremy Ramirez',
  },
  {
    pdv: 'Supermercado BH C...',
    route_name: 'Rota MG 541',
    origin: 'Rota',
    executor: 'Marina Silva',
    check_time: '09:10:21',
    distance: '1,25m',
    supervisor: 'George Williamson',
  },
  {
    pdv: 'Lojas Apoio Castelo',
    route_name: 'Rota 104562',
    origin: 'Carteira',
    executor: 'Cristiano Sampaio',
    check_time: '09:10:21',
    distance: '0,05m',
    supervisor: 'George Williamson',
  },
  {
    pdv: 'Assai Contagem',
    route_name: 'Rota 104562',
    origin: 'Carteira',
    executor: 'Carme Adams',
    check_time: '09:10:21',
    distance: '0,03m',
    supervisor: 'Jeremy Ramirez',
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
    if (name === 'origin') result = result.filter((r) => r.origin === value)
  }

  return result
}

const RegisteredByCell = (props: {
  onClick: () => void
}) => {
  const { onClick } = props

  return (
    <span
      role='button'
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.stopPropagation()
          onClick()
        }
      }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
      aria-label='Registrado por foto'
    >
      <span>Foto</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
        <CheckFoto width={14} height={14} />
      </span>
    </span>
  )
}

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [open, setOpen] = useState<JSX.Element | null>(null)

  const [activeTab, setActiveTab] = useState(0)
  const mode: Mode = activeTab === 0 ? 'check-in' : 'check-out'

  const [page, setPage] = useState<number>(1)
  const [isLastPage] = useState<boolean>(true)

  const paginator = () => {
    // Mantemos apenas uma página por enquanto.
  }

  const reload = () => {
    // Quando a API for definida, este método será responsável por recarregar os dados.
  }

  const onClickExtractData = () => {
    // A integração da extração de dados será implementada quando o contrato da API estiver definido.
  }

  const openPhotoModal = (row: DataInterface) => {
    const isCheckIn = mode === 'check-in'

    const executorLabel = row.executor?.trim() ? row.executor : '—'
    const pdvLabel = row.pdv?.trim() ? row.pdv : '—'
    const roteiroLabel = row.route_name?.trim() ? row.route_name : '—'
    const timeLabel = row.check_time?.trim() ? row.check_time : '—'
    const distanceLabel = row.distance?.trim() ? row.distance : '—'

    setOpen(
      <CheckValidationModal
        data={{
          title: 'Dados do Registro',
          store_title: (
            <span>
              <span style={{ fontWeight: 400 }}>Executor:</span>{' '}
              <span style={{ fontWeight: 700 }}>{executorLabel}</span>
            </span>
          ),
          store_subtitle: (
            <span>
              <span>PDV:</span> <strong>{pdvLabel}</strong> |{' '}
              <span>Roteiro:</span> <strong>{roteiroLabel}</strong> |{' '}
              <span>{isCheckIn ? 'Check-in' : 'Check-out'}:</span>{' '}
              <strong>{timeLabel}</strong> |{' '}
              <span>Distância do PDV:</span> <strong>{distanceLabel}</strong>
            </span>
          ),
          options: [
            {
              label: 'Dados do Monitoramento',
              component: (
                <div>
                  <div
                    style={{
                      borderTop: '1px solid #e5e7eb',
                      margin: '12px 0',
                    }}
                  />
                  <div style={{ fontWeight: 700, marginBottom: 12 }}>
                    Dados do Monitoramento
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: 0,
                      paddingTop: 0,
                    }}
                  >
                    <div style={{ flex: 1, paddingRight: 12 }}>
                      <Photo
                        captionLeft={row.pdv}
                        captionRight={isCheckIn ? 'Checkin' : 'Checkout'}
                      />
                    </div>

                    <div
                      style={{
                        flex: 1,
                        paddingLeft: 12,
                        borderLeft: '1px solid #e5e7eb',
                      }}
                    >
                      <Map type={isCheckIn ? 'check_in' : 'check_out'} />
                    </div>
                  </div>
                </div>
              ),
            },
          ],
          onClose: () => setOpen(null),
        }}
      />,
    )
  }

  const rows = useMemo(() => {
    const base = mode === 'check-in' ? CHECK_IN_ROWS : CHECK_OUT_ROWS

    let result = [...base]

    if (search.trim().length > 0) {
      const q = search.trim().toLowerCase()
      result = result.filter((r) => {
        return [r.pdv, r.route_name, r.origin, r.executor, r.check_time, r.distance]
          .join(' ')
          .toLowerCase()
          .includes(q)
      })
    }

    result = applyClientFilters(result, appliedFilters)

    return result
  }, [appliedFilters, mode, search])

  const body: BodyInterface[] = useMemo(
    () =>
      rows.map((row) => {
        return {
          pdv: row.pdv,
          route_name: row.route_name,
          origin: row.origin,
          executor: row.executor,
          check_time: row.check_time,
          registered_by: <RegisteredByCell onClick={() => openPhotoModal(row)} />,
          distance: row.distance,
        }
      }),
    [rows],
  )

  return (
    <React.Fragment>
      <Tabs
        options={[
          { label: `Check-in (${CHECK_IN_TOTAL})` },
          { label: `Check-out (${CHECK_OUT_TOTAL})` },
        ]}
        active={{ active: activeTab, setActive: setActiveTab }}
        style={{ marginBottom: 12 }}
      />

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
        columns={mode === 'check-in' ? checkInHeader : checkOutHeader}
        rows={body}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={false}
        paginator={paginator}
        page={page}
        setPage={setPage}
      />

      <ManagerCounter
        partial={body.length}
        total={mode === 'check-in' ? CHECK_IN_TOTAL : CHECK_OUT_TOTAL}
      />

      {open}
    </React.Fragment>
  )
}

export default Manager
