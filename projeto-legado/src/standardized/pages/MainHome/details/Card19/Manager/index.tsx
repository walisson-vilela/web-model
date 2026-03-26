import React, { useMemo, useState } from 'react'

import { MwManager, Toolbar } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'

import ManagerColumnPopup from '../../../../../../components/ManagerColumnPopup'
import ManagerCounter from '../../../../../../components/ManagerCounter'
import type { ManagerProps } from '../../../../../../screens/interfaces'

import { CheckValidationModal } from '../../Card4/Manager/components/Modal'
import { Attempts, Map, Photo } from '../../Card4/Manager/components/Modal/components'
import { CheckFoto, CheckGps } from '../../Card4/Manager/icons'

import filters from './filters'
import header from './header'
import type { BodyInterface, CheckCellData, CheckType } from './interfaces'

const CHECK_ICON_SIZE = 14

type OccurrenceItem = {
  start: string
  end: string
  duration: string
}

const buildMockOccurrences = (count: number): OccurrenceItem[] => {
  const base: OccurrenceItem[] = [
    { start: '07:00', end: '08:00', duration: '01:00' },
    { start: '08:00', end: '09:00', duration: '01:00' },
    { start: '10:00', end: '10:30', duration: '01:00' },
    { start: '13:00', end: '-', duration: '-' },
  ]

  if (count <= base.length) return base.slice(0, count)

  const extra = Array.from({ length: Math.max(0, count - base.length) }).map(
    (_, index) => ({
      start: '14:00',
      end: '14:30',
      duration: '00:30',
      key: index,
    }),
  )

  return [...base, ...extra.map(({ start, end, duration }) => ({ start, end, duration }))]
}

const CheckIcon = (props: { type: CheckType }) => {
  if (props.type === 'gps') {
    return <CheckGps width={CHECK_ICON_SIZE} height={CHECK_ICON_SIZE} />
  }

  return <CheckFoto width={CHECK_ICON_SIZE} height={CHECK_ICON_SIZE} />
}

const CheckCell = (props: {
  data: CheckCellData
  onIconClick?: () => void
}) => {
  const { data, onIconClick } = props

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      <span style={{ lineHeight: 1 }}>{data.time}</span>
      {data.time !== '-' ? (
        <span
          role='button'
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation()
            onIconClick?.()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation()
              onIconClick?.()
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: CHECK_ICON_SIZE,
            height: CHECK_ICON_SIZE,
            cursor: 'pointer',
          }}
        >
          <CheckIcon type={data.type} />
        </span>
      ) : null}
    </span>
  )
}

const OccurrencesCell = (props: { count: number }) => {
  const { count } = props

  const trigger = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      aria-label='Ver ocorrências'
    >
      {count}
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
        const items = buildMockOccurrences(count)

        return (
          <div style={{ width: 520, maxWidth: 'calc(100vw - 64px)' }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>
              Ocorrências ({count})
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 12,
                fontWeight: 700,
                color: '#374151',
                padding: '10px 12px',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <div>Início</div>
              <div>Fim</div>
              <div>Duração</div>
            </div>

            <div style={{ maxHeight: 220, overflow: 'auto' }}>
              {items.map((item, index) => (
                <div
                  key={`${item.start}-${item.end}-${index}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 12,
                    padding: '10px 12px',
                    borderBottom: '1px solid #f3f4f6',
                    color: '#111827',
                  }}
                >
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

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [open, setOpen] = useState<JSX.Element | null>(null)

  const rows: Omit<BodyInterface, 'check_in' | 'check_out' | 'occurrences'>[] =
    useMemo(
      () => [
        {
          name: 'Rachel Patel',
          route: 'Rota SP 1011',
          pdv: 'Verdemar - Savassi',
          audit: 'Pendente',
          attendance_time: '01h:00min',
          check_in_data: { time: '08:00:00', type: 'gps', attempts: 0 },
          check_out_data: { time: '01:00:15', type: 'photo', attempts: 0 },
          occurrences_count: 4,
        },
        {
          name: 'Julie Adams',
          route: 'Rota MG 001',
          pdv: 'Hipermercado Extra C...',
          audit: '-',
          attendance_time: '01h:08min',
          check_in_data: { time: '07:00:00', type: 'gps', attempts: 0 },
          check_out_data: { time: '01:08:05', type: 'photo', attempts: 0 },
          occurrences_count: 5,
        },
        {
          name: 'Jó Licon',
          route: 'Rota 104562',
          pdv: 'Extra Eldorado',
          audit: '-',
          attendance_time: '01h:15min',
          check_in_data: { time: '07:01:05', type: 'gps', attempts: 0 },
          check_out_data: { time: '01:15:35', type: 'photo', attempts: 0 },
          occurrences_count: 2,
        },
        {
          name: 'Carlos Soares',
          route: 'Rota MG 15245',
          pdv: 'Supernosso - Contagem',
          audit: '-',
          attendance_time: '01h:00min',
          check_in_data: { time: '07:03:15', type: 'gps', attempts: 0 },
          check_out_data: { time: '01:00:00', type: 'photo', attempts: 0 },
          occurrences_count: 3,
        },
        {
          name: 'Marina Silva',
          route: 'Rota MG 541',
          pdv: 'Supermercado BH C...',
          audit: 'Pendente',
          attendance_time: '01h:05min',
          check_in_data: { time: '07:05:08', type: 'gps', attempts: 0 },
          check_out_data: { time: '01:05:08', type: 'photo', attempts: 0 },
          occurrences_count: 5,
        },
        {
          name: 'Cristiano Sampaio',
          route: 'Rota 104562',
          pdv: 'Lojas Apoio Castelo',
          audit: 'Pendente',
          attendance_time: '00h:30min',
          check_in_data: { time: '08:03:35', type: 'gps', attempts: 0 },
          check_out_data: { time: '00:30:35', type: 'photo', attempts: 0 },
          occurrences_count: 7,
        },
        {
          name: 'Carme Adams',
          route: 'Rota 104562',
          pdv: 'Assai Contagem',
          audit: '-',
          attendance_time: '00h:35min',
          check_in_data: { time: '08:05:08', type: 'gps', attempts: 0 },
          check_out_data: { time: '00:35:15', type: 'photo', attempts: 0 },
          occurrences_count: 3,
        },
        {
          name: 'Carlos Soares da S...',
          route: 'Rota 104562',
          pdv: 'Supernosso - Eldorado',
          audit: '-',
          attendance_time: '00h:45min',
          check_in_data: { time: '07:15:01', type: 'gps', attempts: 0 },
          check_out_data: { time: '00:45:08', type: 'photo', attempts: 0 },
          occurrences_count: 1,
        },
        {
          name: 'Miguel Lisboa Neto',
          route: 'Rota 104562',
          pdv: 'Extra Contagem',
          audit: 'Pendente',
          attendance_time: '00h:50min',
          check_in_data: { time: '08:05:08', type: 'gps', attempts: 0 },
          check_out_data: { time: '00:50:05', type: 'photo', attempts: 0 },
          occurrences_count: 2,
        },
        {
          name: 'Davi Antunes do ...',
          route: 'Rota 104562',
          pdv: 'Supermercado BH Eld...',
          audit: 'Pendente',
          attendance_time: '00h:35min',
          check_in_data: { time: '08:05:08', type: 'gps', attempts: 0 },
          check_out_data: { time: '00:35:08', type: 'photo', attempts: 0 },
          occurrences_count: 3,
        },
      ],
      [],
    )

  const rowsWithCells: BodyInterface[] = useMemo(() => {
    return rows.map((row) => {
      const openCheckModal = (type: 'check_in' | 'check_out') => {
        const isCheckIn = type === 'check_in'
        const check = isCheckIn ? row.check_in_data : row.check_out_data
        const attemptsCount =
          check.type === 'gps' ? Math.max(check.attempts, 2) : Math.max(check.attempts, 2)
        const attemptsType = check.type === 'gps' ? 'gps' : 'gps'

        const executorLabel = row.name?.trim() ? row.name : '—'
        const pdvLabel = row.pdv?.trim() ? row.pdv : '—'
        const roteiroLabel = row.route?.trim() ? row.route : '—'
        const timeLabel = check.time?.trim() ? check.time : '—'

        setOpen(
          <CheckValidationModal
            data={{
              title: 'Dados do Registro',
              store_title: `Executor: ${executorLabel}`,
              store_subtitle: `PDV: ${pdvLabel} | Roteiro: ${roteiroLabel} | ${
                isCheckIn ? 'Check-in' : 'Check-out'
              }: ${timeLabel}`,
              options: [
                {
                  label: `Confirmar ${isCheckIn ? 'Checkin' : 'Checkout'}`,
                  component:
                    check.type === 'gps' ? (
                      <Map
                        type={type}
                        showValidationFooter
                        enableSelfValidationPopup
                        enableGpsValidationPopup
                      />
                    ) : (
                      <Photo
                        captionLeft={row.pdv}
                        captionRight={isCheckIn ? 'Checkin' : 'Checkout'}
                        showValidationFooter
                        enableSelfValidationPopup
                        enableGpsValidationPopup
                        gpsMapType={type}
                      />
                    ),
                },
                {
                  label: `Tentativa e falha (${attemptsCount})`,
                  component: (
                    <Attempts
                      attempts={attemptsCount}
                      type={attemptsType}
                    />
                  ),
                },
              ],
              onClose: () => setOpen(null),
            }}
          />,
        )
      }

      return {
        ...row,
        check_in: (
          <CheckCell
            data={row.check_in_data}
            onIconClick={() => openCheckModal('check_in')}
          />
        ),
        check_out: (
          <CheckCell
            data={row.check_out_data}
            onIconClick={() => openCheckModal('check_out')}
          />
        ),
        occurrences: (
          <OccurrencesCell count={row.occurrences_count} />
        ),
      }
    })
  }, [rows])

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
        rows={rowsWithCells}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={false}
        paginator={paginator}
        page={page}
        setPage={setPage}
      />

      <ManagerCounter partial={rows.length} total={totalRegistries} />

      {open}
    </React.Fragment>
  )
}

export default Manager
