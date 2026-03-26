import React, { useMemo, useState } from 'react'

import type { DropdownInterfaces, FiltersInterfaces, SortState } from '@mw-kit/mw-manager'
import { MwManager, Toolbar } from '@mw-kit/mw-manager'
import { MwButton, MwInput } from '@mw-kit/mw-ui'

import { Popup as SemanticPopup } from 'semantic-ui-react'

import ManagerColumnPopup from '../../../../../../components/ManagerColumnPopup'
import ManagerCounter from '../../../../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../../../../components/MwModal'
import type { ManagerProps } from '../../../../../../screens/interfaces'

import filters from './filters'
import header from './header'
import type { DataInterface } from './interfaces'

type StatusDotProps = {
  color: string
}

const StatusDot = ({ color }: StatusDotProps) => (
  <span
    style={{
      display: 'inline-block',
      width: 12,
      height: 12,
      borderRadius: 999,
      backgroundColor: color,
    }}
  />
)

type MetricWithDotProps = {
  value: string
  color: string
  tooltip?: {
    title: string
    newVersion: string
  }
}

type AlterImeiModalContentProps = {
  item: DataInterface
}

const formatSyncDate = (value: unknown) => {
  const text = String(value || '').trim()
  if (!text || text === '—') return '—'
  const parts = text.split(' ')
  if (parts.length >= 2) return `${parts[0]} às ${parts.slice(1).join(' ')}`
  return text
}

const LastConnectionCell = (props: { value: string }) => {
  const text = String(props.value || '').trim()

  if (!text || text === '—' || text === '-') {
    return <span>-</span>
  }

  const [date, ...rest] = text.split(' ')
  const time = rest.join(' ').trim()

  if (!date) return <span>-</span>

  return (
    <div style={{ lineHeight: 1.2 }}>
      <div>{date}</div>
      {time ? (
        <div style={{ fontSize: 12, color: '#9AA0A6' }}>{time}</div>
      ) : null}
    </div>
  )
}

const AlterImeiModalContent = ({ item }: AlterImeiModalContentProps) => {
  const [newImei, setNewImei] = useState<string>('')
  const [autoImei, setAutoImei] = useState<boolean>(false)

  const lastConnection =
    typeof item === 'object' && item !== null && 'last_connection' in item
      ? (item as { last_connection?: unknown }).last_connection
      : undefined

  return (
    <div>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{item.name}</div>
      <div style={{ marginBottom: 4 }}>
        <strong>Nº Imei atual:</strong> {String(item.imei || '—')}
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong>Sincronização:</strong> {formatSyncDate(lastConnection)}
      </div>

      <div style={{ height: 1, background: '#E6E6E6', margin: '12px 0' }} />

      <div style={{ marginBottom: 8, color: '#6B7280' }}>Insira o novo Nº Imei</div>

      <MwInput
        value={newImei}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewImei(e.target.value)}
        disabled={autoImei}
        style={{ width: '100%' }}
      />

      <div style={{ marginTop: 10 }}>
        <MwInput
          type='checkbox'
          checked={autoImei}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAutoImei(e.target.checked)}
          label='Obter Imei automaticamente.'
        />
      </div>
    </div>
  )
}

const MetricWithDot = ({ value, color, tooltip }: MetricWithDotProps) => {
  const dot = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: tooltip ? 'pointer' : 'default',
      }}
      aria-label={tooltip ? tooltip.title : undefined}
    >
      <StatusDot color={color} />
    </span>
  )

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        whiteSpace: 'nowrap',
      }}
    >
      <span>{value}</span>

      {tooltip ? (
        <SemanticPopup
          on='hover'
          position='left center'
          className='popup-field'
          inverted
          style={{ borderRadius: 0 }}
          content={
            <div style={{ minWidth: 160 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                {tooltip.title}
              </div>
              <div style={{ opacity: 0.95 }}>
                Nova versão: {tooltip.newVersion}
              </div>
            </div>
          }
          trigger={dot}
        />
      ) : (
        dot
      )}
    </span>
  )
}

type GpsOffItem = {
  date: string
  start: string
  end: string
  duration: string
}

const buildMockGpsOffItems = (count: number): GpsOffItem[] => {
  const base: GpsOffItem[] = [
    { date: '01/10/2020', start: '08:00', end: '08:00', duration: '01:00' },
    { date: '30/09/2020', start: '09:00', end: '09:00', duration: '01:00' },
    { date: '25/09/2020', start: '10:30', end: '10:30', duration: '01:00' },
    { date: '15/09/2020', start: '13:00', end: '13:00', duration: '01:00' },
    { date: '10/09/2020', start: '15:00', end: '15:00', duration: '01:00' },
  ]

  if (count <= 0) return []
  if (count <= base.length) return base.slice(0, count)

  return [
    ...base,
    ...Array.from({ length: count - base.length }).map((_, index) => ({
      date: '09/09/2020',
      start: '16:00',
      end: '16:00',
      duration: '01:00',
      key: index,
    })),
  ].map(({ date, start, end, duration }) => ({ date, start, end, duration }))
}

const GpsOffCell = (props: { count: number }) => {
  const { count } = props

  if (!count) return <span>—</span>

  const trigger = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      aria-label='Ver ocorrências de GPS off'
    >
      {String(count).padStart(2, '0')}
    </span>
  )

  return (
    <ManagerColumnPopup
      on='click'
      position='left center'
      offset={[12, 0]}
      trigger={trigger}
      triggerDisplay='inline'
      getContent={async () => {
        const items = buildMockGpsOffItems(count)

        return (
          <div style={{ width: 520, maxWidth: 'calc(100vw - 64px)' }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>
              GPS off ({count})
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                gap: 12,
                fontWeight: 700,
                color: '#374151',
                padding: '10px 12px',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <div>Data</div>
              <div>Início</div>
              <div>Fim</div>
              <div>Duração</div>
            </div>

            <div style={{ maxHeight: 220, overflow: 'auto' }}>
              {items.map((item, index) => (
                <div
                  key={`${item.date}-${item.start}-${item.end}-${index}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    gap: 12,
                    padding: '10px 12px',
                    borderBottom: '1px solid #f3f4f6',
                    color: '#111827',
                  }}
                >
                  <div>{item.date}</div>
                  <div>{item.start}</div>
                  <div>{item.end}</div>
                  <div>{item.duration}</div>
                </div>
              ))}
            </div>
          </div>
        )
      }}
    />
  )
}

const DeviceOffCell = (props: { count: number }) => {
  const { count } = props

  if (!count) return <span>—</span>

  const trigger = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      aria-label='Ver ocorrências de Aparelho off'
    >
      {String(count).padStart(2, '0')}
    </span>
  )

  return (
    <ManagerColumnPopup
      on='click'
      position='left center'
      offset={[12, 0]}
      trigger={trigger}
      triggerDisplay='inline'
      getContent={async () => {
        const items = buildMockGpsOffItems(count)

        return (
          <div style={{ width: 520, maxWidth: 'calc(100vw - 64px)' }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>
              Aparelho off ({count})
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                gap: 12,
                fontWeight: 700,
                color: '#374151',
                padding: '10px 12px',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <div>Data</div>
              <div>Início</div>
              <div>Fim</div>
              <div>Duração</div>
            </div>

            <div style={{ maxHeight: 220, overflow: 'auto' }}>
              {items.map((item, index) => (
                <div
                  key={`${item.date}-${item.start}-${item.end}-${index}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    gap: 12,
                    padding: '10px 12px',
                    borderBottom: '1px solid #f3f4f6',
                    color: '#111827',
                  }}
                >
                  <div>{item.date}</div>
                  <div>{item.start}</div>
                  <div>{item.end}</div>
                  <div>{item.duration}</div>
                </div>
              ))}
            </div>
          </div>
        )
      }}
    />
  )
}

const applyClientFilters = (
  rows: DataInterface[],
  appliedFilters: FiltersInterfaces.AppliedFilter[],
) => {
  let result = [...rows]

  for (let i = 0; i < appliedFilters.length; i++) {
    const { name, value } = { ...appliedFilters[i] }

    if (name === 'supervisor_id') {
      result = result.filter((r) => String(r.supervisor_id || '') === String(value))
    }

    if (name === 'system') {
      result = result.filter((r) => {
        if (value === 'android') return r.system_os === 'android'
        if (value === 'ios') return r.system_os === 'ios'
        return true
      })
    }

    if (name === 'sync_pending') {
      if (value === 'sim') result = result.filter((r) => r.synced_status === 'pendente')
      if (value === 'nao') result = result.filter((r) => r.synced_status !== 'pendente')
    }

    if (name === 'gps_off') {
      if (value === 'sim') result = result.filter((r) => (r.gps_off_count || 0) > 0)
      if (value === 'nao') result = result.filter((r) => (r.gps_off_count || 0) === 0)
    }

    if (name === 'device_off') {
      if (value === 'sim') result = result.filter((r) => (r.device_off_count || 0) > 0)
      if (value === 'nao') result = result.filter((r) => (r.device_off_count || 0) === 0)
    }

    if (name === 'app_version') {
      if (value === 'outdated') result = result.filter((r) => Boolean(r.app_version_outdated))
      if (value === 'updated') result = result.filter((r) => !r.app_version_outdated)
    }

    if (name === 'base_app') {
      if (value === 'outdated') result = result.filter((r) => Boolean(r.base_app_outdated))
      if (value === 'updated') result = result.filter((r) => !r.base_app_outdated)
    }

    if (name === 'smart_scan') {
      if (value === 'outdated') result = result.filter((r) => Boolean(r.smart_scan_outdated))
      if (value === 'updated') result = result.filter((r) => !r.smart_scan_outdated)
    }
  }

  return result
}

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [modal, setModal] = useState<ModalState>(null)

  const [page, setPage] = React.useState<number>(1)
  const [isLastPage] = React.useState<boolean>(true)

  const paginator = () => {
    // Mantemos apenas uma página por enquanto.
  }

  const reload = () => {
    // Quando a API for definida, este método será responsável por recarregar os dados.
  }

  const onClickExtractData = () => {
    // A integração da extração de dados será implementada quando o contrato da API estiver definido.
  }

  const baseRows: DataInterface[] = useMemo(
    () => [
      {
        name: 'Rachel Patel',
        supervisor_id: 221060,
        supervisor: 'Jeremy Ramirez',
        system_device: (
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontWeight: 500 }}>Android</div>
            <div style={{ fontSize: 12, color: '#9AA0A6' }}>Samsung (SM - A207M)</div>
          </div>
        ),
        system_os: 'android',
        imei: '29bq35cd...',
        synced: 'Sim',
        synced_status: 'sim',
        gps_off_count: 3,
        gps_off: <GpsOffCell count={3} />,
        device_off_count: 3,
        device_off: <DeviceOffCell count={3} />,
        app_version: (
          <MetricWithDot
            value='2.850/10'
            color='#E23851'
            tooltip={{ title: 'Versão desatualizada', newVersion: '3.000' }}
          />
        ),
        app_version_outdated: true,
        base_app: (
          <MetricWithDot
            value='2345/10'
            color='#E23851'
            tooltip={{ title: 'Versão desatualizada', newVersion: '35450125' }}
          />
        ),
        base_app_outdated: true,
        base_smart_scan: (
          <MetricWithDot
            value='23450121'
            color='#E23851'
            tooltip={{ title: 'Versão desatualizada', newVersion: '35450125' }}
          />
        ),
        smart_scan_outdated: true,
        last_connection: '01/10/2020 09:10:35',
      },
      {
        name: 'Julie Adams',
        supervisor_id: 231565,
        supervisor: 'George Williamson',
        system_device: <div style={{ lineHeight: 1.2 }}><div style={{ fontWeight: 500 }}>—</div></div>,
        system_os: 'unknown',
        imei: '—',
        synced: 'Pendente',
        synced_status: 'pendente',
        gps_off_count: 0,
        gps_off: '—',
        device_off_count: 0,
        device_off: '—',
        app_version_outdated: false,
        app_version: '—',
        base_app_outdated: false,
        base_app: '—',
        smart_scan_outdated: false,
        base_smart_scan: '—',
        last_connection: '—',
      },
      {
        name: 'Jô Licon',
        supervisor_id: 231565,
        supervisor: 'George Williamson',
        system_device: (
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontWeight: 500 }}>Android</div>
            <div style={{ fontSize: 12, color: '#9AA0A6' }}>Samsung (SM - A207M)</div>
          </div>
        ),
        system_os: 'android',
        imei: '29bq35cd...',
        synced: 'Sim',
        synced_status: 'sim',
        gps_off_count: 5,
        gps_off: <GpsOffCell count={5} />,
        device_off_count: 0,
        device_off: '—',
        app_version: <MetricWithDot value='2.850/10' color='#62C462' />,
        app_version_outdated: false,
        base_app: <MetricWithDot value='2345/10' color='#62C462' />,
        base_app_outdated: false,
        base_smart_scan: <MetricWithDot value='23450121' color='#62C462' />,
        smart_scan_outdated: false,
        last_connection: '30/09/2020 23:15:08',
      },
      {
        name: 'Carlos Soares',
        supervisor_id: 221060,
        supervisor: 'Jeremy Ramirez',
        system_device: (
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontWeight: 500 }}>Android</div>
            <div style={{ fontSize: 12, color: '#9AA0A6' }}>Samsung (SM - A207M)</div>
          </div>
        ),
        system_os: 'android',
        imei: '—',
        synced: 'Pendente',
        synced_status: 'pendente',
        gps_off_count: 2,
        gps_off: <GpsOffCell count={2} />,
        device_off_count: 0,
        device_off: '—',
        app_version: <MetricWithDot value='2.850/10' color='#62C462' />,
        app_version_outdated: false,
        base_app: <MetricWithDot value='2345/10' color='#62C462' />,
        base_app_outdated: false,
        base_smart_scan: <MetricWithDot value='23450121' color='#62C462' />,
        smart_scan_outdated: false,
        last_connection: '01/10/2020 08:20:05',
      },
      {
        name: 'Marina Silva',
        supervisor_id: 231565,
        supervisor: 'George Williamson',
        system_device: (
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontWeight: 500 }}>IOS</div>
            <div style={{ fontSize: 12, color: '#9AA0A6' }}>Apple (iPhone 15.3)</div>
          </div>
        ),
        system_os: 'ios',
        imei: '—',
        synced: 'Sim',
        synced_status: 'sim',
        gps_off_count: 3,
        gps_off: <GpsOffCell count={3} />,
        device_off_count: 2,
        device_off: <DeviceOffCell count={2} />,
        app_version: (
          <MetricWithDot
            value='2.850/10'
            color='#E23851'
            tooltip={{ title: 'Versão desatualizada', newVersion: '3.000' }}
          />
        ),
        app_version_outdated: true,
        base_app: (
          <MetricWithDot
            value='2345/10'
            color='#E23851'
            tooltip={{ title: 'Versão desatualizada', newVersion: '35450125' }}
          />
        ),
        base_app_outdated: true,
        base_smart_scan: (
          <MetricWithDot
            value='23450121'
            color='#E23851'
            tooltip={{ title: 'Versão desatualizada', newVersion: '35450125' }}
          />
        ),
        smart_scan_outdated: true,
        last_connection: '01/10/2020 05:10:08',
      },
      {
        name: 'Cristiano Sampaio',
        supervisor_id: 221060,
        supervisor: 'Jeremy Ramirez',
        system_device: (
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontWeight: 500 }}>IOS</div>
            <div style={{ fontSize: 12, color: '#9AA0A6' }}>Apple (iPhone 15.3)</div>
          </div>
        ),
        system_os: 'ios',
        imei: '—',
        synced: 'Pendente',
        synced_status: 'pendente',
        gps_off_count: 5,
        gps_off: <GpsOffCell count={5} />,
        device_off_count: 1,
        device_off: <DeviceOffCell count={1} />,
        app_version: <MetricWithDot value='2.850/10' color='#62C462' />,
        app_version_outdated: false,
        base_app: <MetricWithDot value='2345/10' color='#62C462' />,
        base_app_outdated: false,
        base_smart_scan: <MetricWithDot value='23450121' color='#62C462' />,
        smart_scan_outdated: false,
        last_connection: '01/10/2020 03:10:08',
      },
      {
        name: 'Carme Adams',
        supervisor_id: 231565,
        supervisor: 'George Williamson',
        system_device: (
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontWeight: 500 }}>Android</div>
            <div style={{ fontSize: 12, color: '#9AA0A6' }}>Samsung (SM - A207M)</div>
          </div>
        ),
        system_os: 'android',
        imei: '29bq35cd...',
        synced: 'Sim',
        synced_status: 'sim',
        gps_off_count: 3,
        gps_off: <GpsOffCell count={3} />,
        device_off_count: 5,
        device_off: <DeviceOffCell count={5} />,
        app_version: <MetricWithDot value='2.850/10' color='#62C462' />,
        app_version_outdated: false,
        base_app: <MetricWithDot value='2345/10' color='#62C462' />,
        base_app_outdated: false,
        base_smart_scan: <MetricWithDot value='23450121' color='#62C462' />,
        smart_scan_outdated: false,
        last_connection: '01/10/2020 15:10:35',
      },
    ],
    [],
  )

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase()

    const searched = query.length
      ? baseRows.filter((r) => String(r.name).toLowerCase().includes(query))
      : baseRows

    return applyClientFilters(searched, appliedFilters)
  }, [baseRows, search, appliedFilters])

  const rowsWithCells: DataInterface[] = useMemo(() => {
    return rows.map((row) => {
      return {
        ...row,
        last_connection_jsx: <LastConnectionCell value={row.last_connection} />,
      }
    })
  }, [rows])

  const getItemMenu = (item: DataInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: (
          <span
            style={{
              display: 'block',
              width: '140px',
              fontSize: 14,
              lineHeight: 1.2,
            }}
          >
            Alterar Imei
          </span>
        ),
        onClick: () => {
          setModal({
            title: 'Alterar Nº Imei',
            titleColor: 'blue',
            size: 'tiny',
            content: <AlterImeiModalContent item={item} />,
            buttonType: 'MwButton',
            actions: [
              <MwButton
                key='cancel'
                type='button'
                appearance='borderless'
                onClick={() => setModal(null)}
              >
                Cancelar
              </MwButton>,
              <MwButton
                key='save'
                type='button'
                color='blue'
                onClick={() => setModal(null)}
              >
                Salvar
              </MwButton>,
            ],
          })
        },
        rules: [],
      },
    ]
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
        rows={rowsWithCells}
        sort={{ sort: sort as SortState | null, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={false}
        paginator={paginator}
        page={page}
        setPage={setPage}
        getItemMenu={getItemMenu}
      />

      <ManagerCounter partial={rows.length} total={rows.length} />

      <Modal modal={modal} />
    </React.Fragment>
  )
}

export default Manager
