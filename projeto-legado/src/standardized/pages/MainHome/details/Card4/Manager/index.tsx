import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import {
    DropdownInterfaces,
    EllipsisContainer,
    MwManager,
    SearchFilter,
    Toolbar
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import {
    Popup as SemanticPopup,
    Table,
    TableBody,
    TableCell,
    TableRow
} from 'semantic-ui-react'

import type { ColumnInterface } from '@mw-kit/mw-manager'

import Bullet from '../../../../../../components/Bullet'
import ManagerColumnPopup from '../../../../../../components/ManagerColumnPopup'
import ManagerCounter from '../../../../../../components/ManagerCounter'
import ProgressColumn from '../../../../../../components/ProgressColumn'
import Tabs from '../../../../../../components/Tabs'
import Initials from '../../../../Home/components/Header/styles/Initials'
import * as PeoplePopupStyles from '../../../../../../screens/NewDashboard/components/PopupDetails/PeopleDetails/styled'
import * as PopupStyles from '../../../../../../screens/NewDashboard/components/PopupDetails/styled'
import { ManagerProps } from '../../../../../../screens/interfaces'

import * as StoresListS from '../../../../../../screens/_control_panel/PredictedAttendances/ManagerTeams/components/StoresList/styled'
import { peoples as getSupervisorOptions } from '../../../../../../services/options'

import DayPicker from './components/DayPicker'
import { CheckValidationModal } from './components/Modal'
import { Attempts, Map, Photo } from './components/Modal/components'
import ParcialGpsModal from './components/ParcialGpsModal'
import RefuseAttendance from './components/RefuseAttendance'
import filters from './filters'
import header from './header'
import { CheckAuto, CheckCode, CheckFoto, CheckGps, CheckWeb } from './icons'
import {
    AutoCheckPopupData,
    BodyInterface,
    CheckCellData,
    CheckType,
    CodeCheckPopupData,
    ExecutorDetails,
    PdvDetails,
    WebCheckPopupData
} from './interfaces'

const RED = '#E23851'
const CHECK_ICON_SIZE = 14
const ATTEMPTS_WIDTH = 18
const PERFORMANCE_GREEN = '#66BB6A'

const formatPercentPtBr = (value: number) => {
  const formatted = value.toLocaleString('pt-BR', {
    minimumFractionDigits: value % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  })
  return `${formatted}%`
}

const PerformanceBar = (props: { percent: number }) => {
  const { percent } = props

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 120,
          maxWidth: 170,
          height: 10,
          border: '1px solid #e5e7eb',
          borderRadius: 2,
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            backgroundColor: PERFORMANCE_GREEN,
          }}
        />
      </div>
      <span style={{ minWidth: 48, textAlign: 'right', color: '#4b5563' }}>
        {formatPercentPtBr(percent)}
      </span>
    </div>
  )
}

const CheckIcon = (props: { type: CheckType }) => {
  const { type } = props

  switch (type) {
    case 'gps':
      return <CheckGps width={CHECK_ICON_SIZE} height={CHECK_ICON_SIZE} />
    case 'web':
      return <CheckWeb width={CHECK_ICON_SIZE} height={CHECK_ICON_SIZE} />
    case 'auto':
      return <CheckAuto width={CHECK_ICON_SIZE} height={CHECK_ICON_SIZE} />
    case 'code':
      return <CheckCode width={CHECK_ICON_SIZE} height={CHECK_ICON_SIZE} />
    case 'photo':
    default:
      return <CheckFoto width={CHECK_ICON_SIZE} height={CHECK_ICON_SIZE} />
  }
}

const AutoCheckInfoPopup = (props: { data: AutoCheckPopupData }) => {
  const { data } = props

  return (
    <div style={{ width: 560, maxWidth: 'calc(100vw - 64px)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <strong>Código:</strong> {data.code}
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: 700 }}>
            {data.storeName}
          </div>
          <div style={{ width: 1 }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr',
            columnGap: 16,
            rowGap: 6,
          }}
        >
          <div style={{ fontWeight: 700 }}>Dados do registro</div>
          <div>
            <div>{data.description}</div>
            <div>{data.condition}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const WebCheckInfoPopup = (props: { data: WebCheckPopupData }) => {
  const { data } = props

  return (
    <div style={{ width: 560, maxWidth: 'calc(100vw - 64px)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <strong>Código:</strong> {data.code}
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: 700 }}>
            {data.storeName}
          </div>
          <div style={{ width: 1 }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr',
            columnGap: 16,
            rowGap: 6,
          }}
        >
          <div style={{ fontWeight: 700 }}>Dados do registro</div>
          <div>
            {data.lines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AutoCheckIconWithPopup(props: { data: AutoCheckPopupData }) {
  const trigger = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: CHECK_ICON_SIZE,
        height: CHECK_ICON_SIZE,
      }}
    >
      <CheckAuto width={CHECK_ICON_SIZE} height={CHECK_ICON_SIZE} />
    </span>
  )

  return (
    <ManagerColumnPopup
      on='click'
      position='top center'
      offset={[0, 12]}
      trigger={trigger}
      triggerDisplay='inline'
      getContent={async () => <AutoCheckInfoPopup data={props.data} />}
    />
  )
}

function WebCheckIconWithPopup(props: { data: WebCheckPopupData }) {
  const trigger = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: CHECK_ICON_SIZE,
        height: CHECK_ICON_SIZE,
      }}
    >
      <CheckWeb width={CHECK_ICON_SIZE} height={CHECK_ICON_SIZE} />
    </span>
  )

  return (
    <ManagerColumnPopup
      on='click'
      position='top center'
      offset={[0, 12]}
      trigger={trigger}
      triggerDisplay='inline'
      getContent={async () => <WebCheckInfoPopup data={props.data} />}
    />
  )
}

function CodeCheckIconWithPopup(props: { data: CodeCheckPopupData }) {
  const trigger = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: CHECK_ICON_SIZE,
        height: CHECK_ICON_SIZE,
      }}
    >
      <CheckCode width={CHECK_ICON_SIZE} height={CHECK_ICON_SIZE} />
    </span>
  )

  return (
    <ManagerColumnPopup
      on='click'
      position='top center'
      offset={[0, 12]}
      trigger={trigger}
      triggerDisplay='inline'
      getContent={async () => <WebCheckInfoPopup data={props.data} />}
    />
  )
}

const CheckCell = (props: {
  data: CheckCellData
  onIconClick?: () => void
}) => {
  const { data, onIconClick } = props

  const hasOverflowAttempts = data.attempts > 99

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {hasOverflowAttempts ? (
        <span style={{ color: RED, fontWeight: 700 }}>+99</span>
      ) : (
        <React.Fragment>
          <span style={{ lineHeight: 1 }}>{data.time}</span>

          {data.time !== '-' ? (
            <React.Fragment>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: CHECK_ICON_SIZE,
                  height: CHECK_ICON_SIZE,
                  lineHeight: 1,
                }}
              >
                {data.type === 'auto' && data.autoPopup ? (
                  <span
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') e.stopPropagation()
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
                    <AutoCheckIconWithPopup data={data.autoPopup} />
                  </span>
                ) : data.type === 'web' && data.webPopup ? (
                  <span
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') e.stopPropagation()
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
                    <WebCheckIconWithPopup data={data.webPopup} />
                  </span>
                ) : data.type === 'code' && data.codePopup ? (
                  <span
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') e.stopPropagation()
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
                    <CodeCheckIconWithPopup data={data.codePopup} />
                  </span>
                ) : (
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
                )}
              </span>

              <span
                style={{
                  minWidth: ATTEMPTS_WIDTH,
                  textAlign: 'left',
                  color: data.attempts > 0 ? RED : 'transparent',
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {data.attempts > 0 ? data.attempts : '0'}
              </span>
            </React.Fragment>
          ) : (
            <span
              style={{
                width: CHECK_ICON_SIZE + ATTEMPTS_WIDTH,
                height: CHECK_ICON_SIZE,
              }}
            />
          )}
        </React.Fragment>
      )}
    </span>
  )
}

const Dot = (props: { color: string }) => (
  <span
    style={{
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: 999,
      backgroundColor: props.color,
      verticalAlign: 'middle',
    }}
  />
)

type StatusTooltipData = {
  justify_at: string
  people_justify_name: string
  reason: string
}

const StatusCell = (props: {
  label: string
  color: string
  tooltip?: StatusTooltipData
}) => {
  const base = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Dot color={props.color} />
      <span>{props.label}</span>
    </span>
  )

  const shouldShowTooltip =
    (props.label === 'Negado' || props.label === 'Justificado') &&
    !!props.tooltip

  if (!shouldShowTooltip) return base

  return (
    <ManagerColumnPopup
      on='hover'
      position='right center'
      inverted
      trigger={base}
      triggerDisplay='inline'
      getContent={async () => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            maxWidth: 266,
            paddingRight: 8,
          }}
        >
          <span style={{ fontSize: 12, lineHeight: '15px' }}>
            Realizado em: {props.tooltip?.justify_at}
          </span>
          <span style={{ fontSize: 12, lineHeight: '15px' }}>
            Por: <strong>{props.tooltip?.people_justify_name}</strong>
          </span>
          <strong style={{ fontSize: 12, lineHeight: '15px' }}>
            Motivo: {props.tooltip?.reason}
          </strong>
        </div>
      )}
    />
  )
}

const AttendancePointCell = (props: { name: string }) => (
  <div style={{ lineHeight: 1.25, fontWeight: 500 }}>{props.name}</div>
)

const ExecutorCell = (props: { name: string }) => (
  <div style={{ lineHeight: 1.25, fontWeight: 500 }}>{props.name}</div>
)

const buildAddress = (city: string) => city

const PdvDetailsPopup = (props: { details: PdvDetails }) => {
  const { details } = props

  const percent =
    details.history.planned > 0
      ? Math.round((details.history.performed / details.history.planned) * 100)
      : 0

  return (
    <div style={{ width: 560, maxWidth: 'calc(100vw - 64px)' }}>
      <Table style={{ border: 'none' }}>
        <TableBody>
          <TableRow>
            <TableCell width={4} style={{ borderLeft: 'none' }}>
              <strong>ID: </strong>
              {details.id}
            </TableCell>
            <TableCell width={12} style={{ borderLeft: 'none' }}>
              <div style={{ fontWeight: 700 }}>
                {details.name} ({details.document})
              </div>
              <div>{details.markets}</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={4} style={{ borderLeft: 'none' }}>
              <strong>Endereço:</strong>
            </TableCell>
            <TableCell width={12} style={{ borderLeft: 'none' }}>
              {details.addressLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={4} style={{ borderLeft: 'none' }}>
              <strong>Telefone:</strong>
            </TableCell>
            <TableCell width={12} style={{ borderLeft: 'none' }}>
              {details.phones}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={4} style={{ borderLeft: 'none' }}>
              <strong>Contato PDV:</strong>
            </TableCell>
            <TableCell width={12} style={{ borderLeft: 'none' }}>
              {details.contact}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={4} style={{ borderLeft: 'none' }}>
              <strong>Historico de visita:</strong>
            </TableCell>
            <TableCell width={12} style={{ borderLeft: 'none' }}>
              <div>
                Total de visitas programadas {details.history.planned}, sendo{' '}
                {details.history.performed} realizadas <b>({percent}%)</b>
              </div>
              <div>1° visita: {details.history.first}</div>
              <div>Ultima visita: {details.history.last}</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={4} style={{ borderLeft: 'none' }}>
              <strong>Permanência em loja:</strong>
            </TableCell>
            <TableCell width={12} style={{ borderLeft: 'none' }}>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div>Min: {details.permanence.min}</div>
                <div>Media: {details.permanence.med}</div>
                <div>Max: {details.permanence.max}</div>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

const AttendancePointWithPopup = (props: {
  name: string
  details?: PdvDetails
}) => {
  const base = <AttendancePointCell name={props.name} />

  if (!props.details) return base

  const details = props.details

  return (
    <ManagerColumnPopup
      on='click'
      position='right center'
      trigger={base}
      offset={[24, 0]}
      triggerDisplay='inline'
      getContent={async () => <PdvDetailsPopup details={details} />}
    />
  )
}

const RoundedAvatar = (props: { src: string }) => (
  <div
    style={{
      width: 64,
      height: 64,
      borderRadius: '100%',
      backgroundImage: `url(${props.src})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}
  />
)

const AvatarFallback = styled(Initials)`
  width: 64px;
  height: 64px;
  font-size: 20px;
  font-weight: 600;
`

const ExecutorDetailsPopup = (props: {
  details: ExecutorDetails
  fallbackName?: string
}) => {
  const { details, fallbackName } = props
  const hasAvatar =
    typeof details.avatarUrl === 'string' && details.avatarUrl.trim() !== ''
  const displayNameRaw =
    details.name && details.name.trim() !== '-' ? details.name : fallbackName
  const displayName =
    displayNameRaw && displayNameRaw.trim() !== ''
      ? displayNameRaw
      : 'Sem nome'

  return (
    <PopupStyles.Container>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell width={4} style={{ borderLeft: 'none' }}>
              {hasAvatar ? (
                <PeoplePopupStyles.RoundedImage $src={details.avatarUrl} />
              ) : (
                <AvatarFallback name={displayName} />
              )}
            </TableCell>
            <TableCell width={12} style={{ borderLeft: 'none' }}>
              <PopupStyles.FlexContainer>
                <div>
                  <div>
                    <b>{displayName}</b>
                  </div>
                  <div>
                    Função: {details.role} | Matrícula: {details.registration}
                  </div>
                  <div>
                    CPF: {details.cpf} | RE: {details.re}
                  </div>
                </div>

                <PeoplePopupStyles.MarginXAuto>
                  <div>
                    <PeoplePopupStyles.NormalH5>IDC</PeoplePopupStyles.NormalH5>
                  </div>
                  <div>
                    <h2>
                      <b>{details.idc}</b>
                    </h2>
                  </div>
                </PeoplePopupStyles.MarginXAuto>
              </PopupStyles.FlexContainer>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell width={4} style={{ borderLeft: 'none' }}>
              <strong>Endereço:</strong>
            </TableCell>
            <TableCell width={12} style={{ borderLeft: 'none' }}>
              {details.addressLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell width={4} style={{ borderLeft: 'none' }}>
              <strong>Telefone:</strong>
            </TableCell>
            <TableCell width={12} style={{ borderLeft: 'none' }}>
              {details.phones}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell width={4} style={{ borderLeft: 'none' }}>
              <strong>Jornada do dia:</strong>
            </TableCell>
            <TableCell width={12} style={{ borderLeft: 'none' }}>
              {details.journey}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell width={4} style={{ borderLeft: 'none' }}>
              <strong>Líder direto:</strong>
            </TableCell>
            <TableCell width={12} style={{ borderLeft: 'none' }}>
              <div>{details.leader.name}</div>
              <div>{details.leader.phones}</div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell width={4} style={{ borderLeft: 'none' }}>
              <strong>Última Conexão:</strong>
            </TableCell>
            <TableCell width={12} style={{ borderLeft: 'none' }}>
              {details.lastConnection}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PopupStyles.Container>
  )
}

const ExecutorWithPopup = (props: {
  name: string
  details?: ExecutorDetails
}) => {
  const base = <ExecutorCell name={props.name} />

  if (!props.details) return base

  const details = props.details

  return (
    <ManagerColumnPopup
      on='click'
      position='left center'
      trigger={base}
      offset={[24, 0]}
      triggerDisplay='inline'
      getContent={async () => <ExecutorDetailsPopup details={details} />}
    />
  )
}

const TeamNameWithPopup = (props: {
  name: string
  details?: ExecutorDetails
}) => {
  const base = (
    <span style={{ cursor: props.details ? 'pointer' : 'default' }}>
      <Bullet color='#66BB6A' content={props.name} />
    </span>
  )

  if (!props.details) return base

  const details = props.details

  return (
    <ManagerColumnPopup
      on='click'
      position='right center'
      trigger={base}
      offset={[12, 0]}
      triggerDisplay='inline'
      getContent={async () => (
        <ExecutorDetailsPopup details={details} fallbackName={props.name} />
      )}
    />
  )
}

type StoreListItem = {
  store_id: number
  store_name: string
  formatted_address: string
  checked: boolean
}

type JustifiedStoreListItem = {
  store_id: number
  store_name: string
  justification: string
}

type TeamPerformancePopupData = {
  name: string
  role: string
  registration: string
  journeyLabel: string
  tmo: {
    plannedPercent: number
    plannedHours: number
    plannedIsRed: boolean
    realizedPercent: number
    realizedHours: number
  }
  attendance: {
    plannedPdvs: number
    realizedPdvs: number
    percent: number
  }
}

const RealizedPlannedStoresListMock = (props: {
  title: string
  subtitle: JSX.Element
  stores: StoreListItem[]
}) => {
  const { title, subtitle, stores } = props
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return stores
    return stores.filter((s) => {
      return (
        s.store_name.toLowerCase().includes(q) ||
        s.formatted_address.toLowerCase().includes(q) ||
        s.store_id.toString().includes(q)
      )
    })
  }, [search, stores])

  return (
    <StoresListS.Container>
      <StoresListS.Header>
        <div>
          <StoresListS.Title>{title}</StoresListS.Title>
          {subtitle}
        </div>

        <div>
          <SearchFilter
            setSearch={(value: string) => setSearch(value)}
            size='mini'
          />
        </div>
      </StoresListS.Header>

      <StoresListS.ListContainer>
        <StoresListS.List>
          {filtered.map((store) => (
            <StoresListS.Item key={store.store_id}>
              <div>
                <EllipsisContainer>
                  {store.store_id} - {store.store_name}
                </EllipsisContainer>
                <StoresListS.OpacityEllipsis>
                  {store.formatted_address}
                </StoresListS.OpacityEllipsis>
              </div>

              <div>
                <StoresListS.CheckIcon
                  name='check circle'
                  checked={store.checked}
                />
              </div>
            </StoresListS.Item>
          ))}
        </StoresListS.List>
      </StoresListS.ListContainer>
    </StoresListS.Container>
  )
}

const JustifiedStoresListMock = (props: {
  title: string
  subtitle: JSX.Element
  stores: JustifiedStoreListItem[]
}) => {
  const { title, subtitle, stores } = props
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return stores
    return stores.filter((s) => {
      return (
        s.store_name.toLowerCase().includes(q) ||
        s.justification.toLowerCase().includes(q) ||
        s.store_id.toString().includes(q)
      )
    })
  }, [search, stores])

  return (
    <StoresListS.Container>
      <StoresListS.Header>
        <div>
          <StoresListS.Title>{title}</StoresListS.Title>
          {subtitle}
        </div>

        <div>
          <SearchFilter
            setSearch={(value: string) => setSearch(value)}
            size='mini'
          />
        </div>
      </StoresListS.Header>

      <StoresListS.ListContainer>
        <StoresListS.List>
          {filtered.map((store) => (
            <StoresListS.Item key={store.store_id}>
              <div>
                <EllipsisContainer>
                  {store.store_id} - {store.store_name}
                </EllipsisContainer>
                <StoresListS.OpacityEllipsis>
                  Justificativa: {store.justification}
                </StoresListS.OpacityEllipsis>
              </div>

              <div />
            </StoresListS.Item>
          ))}
        </StoresListS.List>
      </StoresListS.ListContainer>
    </StoresListS.Container>
  )
}

const TeamPerformancePopup = (props: { data: TeamPerformancePopupData }) => {
  const { data } = props

  const formatHoursPtBr = (value: number) => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })
  }

  const formatPercent1 = (value: number) => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: value % 1 === 0 ? 0 : 1,
      maximumFractionDigits: 1,
    })
  }

  return (
    <div style={{ width: 420, maxWidth: 'calc(100vw - 64px)' }}>
      <div style={{ padding: '8px 12px' }}>
        <div style={{ fontWeight: 700 }}>{data.name}</div>
        <div>
          Função: {data.role} &nbsp;|&nbsp; Matricula: {data.registration}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb' }} />

      <div style={{ padding: '10px 12px' }}>{data.journeyLabel}</div>

      <div style={{ borderTop: '1px solid #e5e7eb' }} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          padding: '12px',
          rowGap: 6,
          alignItems: 'start',
        }}
      >
        <div style={{ fontWeight: 700 }}>TMO</div>
        <div>
          <div>
            Planejado:{' '}
            <span style={{ color: data.tmo.plannedIsRed ? RED : undefined }}>
              {formatPercent1(data.tmo.plannedPercent)}% ({formatHoursPtBr(data.tmo.plannedHours)}h)
            </span>
          </div>
          <div>
            Realizado: {formatPercent1(data.tmo.realizedPercent)}% ({formatHoursPtBr(data.tmo.realizedHours)}h)
          </div>
        </div>

        <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #e5e7eb', marginTop: 8 }} />

        <div style={{ fontWeight: 700 }}>Atendimento</div>
        <div>
          <div>Previsto: {data.attendance.plannedPdvs}PDVs</div>
          <div>
            Realizado: {data.attendance.realizedPdvs.toString().padStart(2, '0')} PDVs ({formatPercent1(data.attendance.percent)}%)
          </div>
        </div>
      </div>
    </div>
  )
}

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [activeTab, setActiveTab] = useState(0)

  const [open, setOpen] = useState<JSX.Element | null>(null)
  const [modal, setModal] = useState<JSX.Element | null>(null)
  const [date, setDate] = useState<Date>(new Date())

  useEffect(() => {
    setAppliedFilters([])
    setSearch('')
    setPage(1)
  }, [activeTab, setAppliedFilters, setSearch])

  const teamFilters = useMemo(
    () => [
      {
        label: 'Supervisor',
        name: 'supervisor_id',
        options: getSupervisorOptions,
        allowEmptySearch: true,
      },
      {
        label: 'Adicionados',
        name: 'added',
        options: [
          { label: 'Com adicionados', value: true },
          { label: 'Sem adicionados', value: false },
        ],
      },
      {
        label: 'Justificados',
        name: 'justified',
        options: [
          { label: 'Com justificativas', value: true },
          { label: 'Sem justificativas', value: false },
        ],
      },
      {
        label: 'Performance',
        name: 'attendance_performance',
        options: [
          {
            label: '0% à 25%',
            value: 1,
          },
          {
            label: '25% à 50%',
            value: 2,
          },
          {
            label: '50% à 75%',
            value: 3,
          },
          {
            label: '75% à 100%',
            value: 4,
          },
        ],
      },
    ],
    [],
  )

  const teamHeader: ColumnInterface[] = useMemo(
    () => [
      {
        content: 'Nome',
        key: 'people_name_jsx',
        textAlign: 'left',
        width: 3,
        sortKey: 'people_name',
      },
      {
        content: 'Roteiro',
        key: 'route_name',
        textAlign: 'left',
        width: 2,
        sortKey: 'route_name',
      },
      {
        content: 'Realizado/Previsto',
        key: 'realized_planned_jsx',
        textAlign: 'center',
        width: 2,
        sortKey: 'realized_planned',
      },
      {
        content: 'Adicionados',
        key: 'added_jsx',
        textAlign: 'center',
        width: 1,
        sortKey: 'added',
      },
      {
        content: 'Justificado',
        key: 'justified_jsx',
        textAlign: 'center',
        width: 1,
        sortKey: 'justified',
      },
      {
        content: '1° Check in',
        key: 'min_check_in',
        textAlign: 'center',
        width: 2,
        sortKey: 'min_check_in',
      },
      {
        content: 'Último Check out',
        key: 'max_check_out',
        textAlign: 'center',
        width: 2,
        sortKey: 'max_check_out',
      },
      {
        content: 'Performance',
        key: 'attendance_performance_jsx',
        textAlign: 'center',
        width: 3,
        sortKey: 'attendance_performance',
      },
    ],
    [],
  )

  const teamRows = useMemo(
    () => {
      const rows = [
        {
          people_id: '1',
          people_name: 'João da Silva Sauro',
          route_name: 'MG SP01',
          realized: 4,
          planned: 6,
          added: 1,
          justified: 1,
          min_check_in: '07:10',
          max_check_out: '07:10',
          performance: 66.1,
          tmo: {
            plannedPercent: 95,
            plannedHours: 8,
            plannedIsRed: false,
            realizedPercent: 100,
            realizedHours: 8.1,
          },
          attendance: { plannedPdvs: 6, realizedPdvs: 4, percent: 66.6 },
          added_stores: [
            {
              store_id: 786521,
              store_name: 'Rede Mais Supermercado',
              formatted_address: 'Avenida: João Cesar de Oliveira 2167 - Eldorado...',
              checked: true,
            },
          ],
          justified_stores: [
            {
              store_id: 214012,
              store_name: 'Hipermercado Extra Contagem',
              justification: 'Atestado Médico',
            },
            {
              store_id: 214012,
              store_name: 'Hipermercado Extra Eldorado',
              justification: 'Atestado Médico',
            },
          ],
          stores: [
            {
              store_id: 214012,
              store_name: 'Hipermercado Extra Contagem',
              formatted_address: 'Avenida: João Cesar de Oliveira 2167 - Eldorado...',
              checked: true,
            },
            {
              store_id: 12454,
              store_name: 'Supermercado BH Pampulha',
              formatted_address: 'Avenida: João Cesar de Oliveira 2167 - Eldorado...',
              checked: true,
            },
            {
              store_id: 12111,
              store_name: 'Super Nosso Dona Clara',
              formatted_address: 'Avenida: João Cesar de Oliveira 2167 - Eldorado...',
              checked: true,
            },
          ],
          details: {
            avatarUrl: '/assets/images/profile.png',
            name: 'João da Silva Sauro',
            role: 'Promotor',
            registration: '150689',
            cpf: '014.681.685-70',
            re: '10457845',
            idc: '53,2 %',
            addressLines: [
              'Avenida: João Cesar de Oliveira 2167 - Novo Eldorado',
              'Contagem - Minas Gerais - Cep:32044-120',
            ],
            phones: '(31) 2564-5971 | (31) 9 8499-1830 | (31) 9 8500-0050',
            journey: '08:00 as 18:00  -  Pausa Total: 01h e 12 m',
            leader: {
              name: 'Eder Feliciano da Silva',
              phones: '(31) 2564-5971 | (31) 9 8499-1830 | (31) 9 8500-0050',
            },
            lastConnection: 'hoje (29/09/2022) as 17:30:25',
          } satisfies ExecutorDetails,
        },
        {
          people_id: '2',
          people_name: 'Amanda Sampaio Diniz',
          route_name: 'GO 1245...',
          realized: 4,
          planned: 6,
          added: 0,
          justified: 0,
          min_check_in: '07:10',
          max_check_out: '07:10',
          performance: 50,
          tmo: {
            plannedPercent: 160,
            plannedHours: 12.1,
            plannedIsRed: true,
            realizedPercent: 100,
            realizedHours: 8.1,
          },
          attendance: { plannedPdvs: 6, realizedPdvs: 4, percent: 66.6 },
          added_stores: [],
          justified_stores: [],
          stores: [
            {
              store_id: 214012,
              store_name: 'Hipermercado Extra Contagem',
              formatted_address: 'Avenida: João Cesar de Oliveira 2167 - Eldorado...',
              checked: true,
            },
          ],
          details: {
            avatarUrl: '/assets/images/profile.png',
            name: 'Amanda Sampaio Diniz',
            role: '-',
            registration: '-',
            cpf: '-',
            re: '-',
            idc: '-',
            addressLines: ['-'],
            phones: '-',
            journey: '-',
            leader: { name: '-', phones: '-' },
            lastConnection: '-',
          } satisfies ExecutorDetails,
        },
        {
          people_id: '3',
          people_name: 'Cleiton Alves Costa',
          route_name: 'GO 1245...',
          realized: 4,
          planned: 6,
          added: 3,
          justified: 3,
          min_check_in: '07:10',
          max_check_out: '07:10',
          performance: 100,
          tmo: {
            plannedPercent: 100,
            plannedHours: 8,
            plannedIsRed: false,
            realizedPercent: 100,
            realizedHours: 8.0,
          },
          attendance: { plannedPdvs: 6, realizedPdvs: 6, percent: 100 },
          added_stores: [
            {
              store_id: 786521,
              store_name: 'Rede Mais Supermercado',
              formatted_address: 'Avenida: João Cesar de Oliveira 2167 - Eldorado...',
              checked: true,
            },
          ],
          justified_stores: [
            {
              store_id: 214012,
              store_name: 'Hipermercado Extra Contagem',
              justification: 'Atestado Médico',
            },
          ],
          stores: [
            {
              store_id: 214012,
              store_name: 'Hipermercado Extra Contagem',
              formatted_address: 'Avenida: João Cesar de Oliveira 2167 - Eldorado...',
              checked: true,
            },
          ],
          details: {
            avatarUrl: '/assets/images/profile.png',
            name: 'Cleiton Alves Costa',
            role: '-',
            registration: '-',
            cpf: '-',
            re: '-',
            idc: '-',
            addressLines: ['-'],
            phones: '-',
            journey: '-',
            leader: { name: '-', phones: '-' },
            lastConnection: '-',
          } satisfies ExecutorDetails,
        },
        {
          people_id: '4',
          people_name: 'Elias Norma Duster',
          route_name: 'SP 10',
          realized: 4,
          planned: 6,
          added: 4,
          justified: 4,
          min_check_in: '07:10',
          max_check_out: '07:10',
          performance: 100,
          tmo: {
            plannedPercent: 100,
            plannedHours: 8,
            plannedIsRed: false,
            realizedPercent: 100,
            realizedHours: 8.0,
          },
          attendance: { plannedPdvs: 6, realizedPdvs: 6, percent: 100 },
          added_stores: [
            {
              store_id: 786521,
              store_name: 'Rede Mais Supermercado',
              formatted_address: 'Avenida: João Cesar de Oliveira 2167 - Eldorado...',
              checked: true,
            },
          ],
          justified_stores: [
            {
              store_id: 214012,
              store_name: 'Hipermercado Extra Contagem',
              justification: 'Atestado Médico',
            },
          ],
          stores: [
            {
              store_id: 214012,
              store_name: 'Hipermercado Extra Contagem',
              formatted_address: 'Avenida: João Cesar de Oliveira 2167 - Eldorado...',
              checked: true,
            },
          ],
          details: {
            avatarUrl: '/assets/images/profile.png',
            name: 'Elias Norma Duster',
            role: '-',
            registration: '-',
            cpf: '-',
            re: '-',
            idc: '-',
            addressLines: ['-'],
            phones: '-',
            journey: '-',
            leader: { name: '-', phones: '-' },
            lastConnection: '-',
          } satisfies ExecutorDetails,
        },
        {
          people_id: '5',
          people_name: 'Claudio Martins',
          route_name: 'GOP44',
          realized: 4,
          planned: 6,
          added: 0,
          justified: 0,
          min_check_in: '07:10',
          max_check_out: '07:10',
          performance: 100,
          tmo: {
            plannedPercent: 100,
            plannedHours: 8,
            plannedIsRed: false,
            realizedPercent: 100,
            realizedHours: 8.0,
          },
          attendance: { plannedPdvs: 6, realizedPdvs: 6, percent: 100 },
          added_stores: [],
          justified_stores: [],
          stores: [
            {
              store_id: 214012,
              store_name: 'Hipermercado Extra Contagem',
              formatted_address: 'Avenida: João Cesar de Oliveira 2167 - Eldorado...',
              checked: true,
            },
          ],
          details: {
            avatarUrl: '/assets/images/profile.png',
            name: 'Claudio Martins',
            role: '-',
            registration: '-',
            cpf: '-',
            re: '-',
            idc: '-',
            addressLines: ['-'],
            phones: '-',
            journey: '-',
            leader: { name: '-', phones: '-' },
            lastConnection: '-',
          } satisfies ExecutorDetails,
        },
        {
          people_id: '6',
          people_name: 'Ilda Mendes de Souza',
          route_name: 'GOP44',
          realized: 4,
          planned: 6,
          added: 0,
          justified: 0,
          min_check_in: '07:10',
          max_check_out: '07:10',
          performance: 50,
          tmo: {
            plannedPercent: 100,
            plannedHours: 8,
            plannedIsRed: false,
            realizedPercent: 100,
            realizedHours: 8.0,
          },
          attendance: { plannedPdvs: 6, realizedPdvs: 3, percent: 50 },
          added_stores: [],
          justified_stores: [],
          stores: [
            {
              store_id: 214012,
              store_name: 'Hipermercado Extra Contagem',
              formatted_address: 'Avenida: João Cesar de Oliveira 2167 - Eldorado...',
              checked: true,
            },
          ],
          details: {
            avatarUrl: '/assets/images/profile.png',
            name: 'Ilda Mendes de Souza',
            role: '-',
            registration: '-',
            cpf: '-',
            re: '-',
            idc: '-',
            addressLines: ['-'],
            phones: '-',
            journey: '-',
            leader: { name: '-', phones: '-' },
            lastConnection: '-',
          } satisfies ExecutorDetails,
        },
        {
          people_id: '7',
          people_name: 'Carolina Augusta Morais',
          route_name: 'GOP44',
          realized: 4,
          planned: 6,
          added: 0,
          justified: 0,
          min_check_in: '07:10',
          max_check_out: '07:10',
          performance: 25,
          tmo: {
            plannedPercent: 100,
            plannedHours: 8,
            plannedIsRed: false,
            realizedPercent: 100,
            realizedHours: 8.0,
          },
          attendance: { plannedPdvs: 6, realizedPdvs: 1, percent: 25 },
          added_stores: [],
          justified_stores: [],
          stores: [
            {
              store_id: 214012,
              store_name: 'Hipermercado Extra Contagem',
              formatted_address: 'Avenida: João Cesar de Oliveira 2167 - Eldorado...',
              checked: true,
            },
          ],
          details: {
            avatarUrl: '/assets/images/profile.png',
            name: 'Carolina Augusta Morais',
            role: '-',
            registration: '-',
            cpf: '-',
            re: '-',
            idc: '-',
            addressLines: ['-'],
            phones: '-',
            journey: '-',
            leader: { name: '-', phones: '-' },
            lastConnection: '-',
          } satisfies ExecutorDetails,
        },
      ]

      return rows.map((row) => ({
        ...row,
        people_name_jsx: (
          <TeamNameWithPopup name={row.people_name} details={row.details} />
        ),
        realized_planned: `${row.realized}/${row.planned}`,
        realized_planned_jsx: (
          <SemanticPopup
            on='click'
            trigger={
              <span style={{ cursor: 'pointer' }}>
                {row.realized.toString().padStart(2, '0')}/{row.planned
                  .toString()
                  .padStart(2, '0')}
              </span>
            }
            content={
              <RealizedPlannedStoresListMock
                title='Realizado/Previsto'
                subtitle={
                  <span>
                    Executor: <strong>{row.people_name}</strong>
                  </span>
                }
                stores={row.stores}
              />
            }
            position='bottom center'
            style={{ maxWidth: 'unset' }}
          />
        ),
        added_jsx:
          row.added > 0 ? (
            <SemanticPopup
              on='click'
              trigger={
                <span style={{ cursor: 'pointer' }}>
                  {row.added.toString().padStart(2, '0')}
                </span>
              }
              content={
                <RealizedPlannedStoresListMock
                  title='Adicionado(s)'
                  subtitle={
                    <span>
                      Executor: <strong>{row.people_name}</strong>
                    </span>
                  }
                  stores={row.added_stores}
                />
              }
              position='bottom center'
              style={{ maxWidth: 'unset' }}
            />
          ) : (
            <span>{row.added.toString().padStart(2, '0')}</span>
          ),
        justified_jsx:
          row.justified > 0 ? (
            <SemanticPopup
              on='click'
              trigger={
                <span style={{ cursor: 'pointer' }}>
                  {row.justified.toString().padStart(2, '0')}
                </span>
              }
              content={
                <JustifiedStoresListMock
                  title='Justificado(s)'
                  subtitle={
                    <span>
                      Executor: <strong>{row.people_name}</strong>
                    </span>
                  }
                  stores={row.justified_stores}
                />
              }
              position='bottom center'
              style={{ maxWidth: 'unset' }}
            />
          ) : (
            <span>{row.justified.toString().padStart(2, '0')}</span>
          ),
        attendance_performance: row.performance,
        attendance_performance_jsx: (
          <SemanticPopup
            on='click'
            position='left center'
            style={{ maxWidth: 'unset' }}
            trigger={
              <span style={{ cursor: 'pointer', display: 'inline-block', width: '100%' }}>
                <PerformanceBar percent={row.performance} />
              </span>
            }
            content={
              <TeamPerformancePopup
                data={
                  {
                    name: row.people_name,
                    role: row.details?.role || '-',
                    registration: row.details?.registration || '-',
                    journeyLabel: 'Jornada: (22/10) - 08:00 as 17:00 (8.0h)',
                    tmo: row.tmo,
                    attendance: row.attendance,
                  } satisfies TeamPerformancePopupData
                }
              />
            }
          />
        ),
      }))
    },
    [],
  )

  const rows: BodyInterface[] = useMemo(
    () => [
      {
        status: (
          <StatusCell
            label='Negado'
            color='#111827'
            tooltip={{
              justify_at: '09:10:21',
              people_justify_name: 'Carlos Soares da S...',
              reason: 'Check sem foto da self',
            }}
          />
        ),
        route: 'MG SP01',
        attendance_point: (
          <AttendancePointWithPopup
            name='Hipermercado Extra C...'
            details={{
              id: 102000,
              name: 'Hipermercado Extra C...',
              document: '08.624.998/0001-07',
              markets: 'Cash & Carry > GPA - Extra > Hiper',
              addressLines: [
                'Avenida: João Cesar de Oliveira 2167 - Novo Eldorado',
                'Contagem - Minas Gerais - Cep:32044-120',
              ],
              phones: '(31) 2564-5971 | (31) 3396-0010',
              contact: 'Carlos Eduardo Soares da Silva',
              history: {
                planned: 1000,
                performed: 430,
                first: '01/01/2010 as 10:20:00 - João Filho Neto Sampaio',
                last: '04/12/2020 as 15:00:10 - Amanda Aparecida Lisb...',
              },
              permanence: {
                min: '00h:15 mim',
                med: '00h:55 mim',
                max: '02h:10 mim',
              },
            }}
          />
        ),
        audit: 'Pendente',
        origin: 'Carteira',
        planned: '33 min',
        check_in: null,
        check_out: null,
        permanence: '3h e 00 min',
        executor_role: (
          <ExecutorWithPopup
            name='Carlos Soares da S...'
            details={{
              avatarUrl: '/assets/images/profile.png',
              name: 'Carlos Soares da Silva',
              role: 'Promotor',
              registration: '150689',
              cpf: '014.681.685-70',
              re: '10457845',
              idc: '53,2 %',
              addressLines: [
                'Avenida: João Cesar de Oliveira 2167 - Novo Eldorado',
                'Contagem - Minas Gerais - Cep:32044-120',
              ],
              phones: '(31) 2564-5971 | (31) 9 8499-1830 | (31) 9 8500-0050',
              journey: '08:00 as 18:00  -  Pausa Total: 01h e 12 m',
              leader: {
                name: 'Eder Feliciano da Silva',
                phones: '(31) 2564-5971 | (31) 9 8499-1830 | (31) 9 8500-0050',
              },
              lastConnection: 'hoje (04/12/2020) as 15:00:25',
            }}
          />
        ),
        store_id: '102000',
        store_name: 'Hipermercado Extra C...',
        store_address: buildAddress('Contagem - MG'),
        store_details: {
          id: 102000,
          name: 'Hipermercado Extra C...',
          document: '08.624.998/0001-07',
          markets: 'Cash & Carry > GPA - Extra > Hiper',
          addressLines: [
            'Avenida: João Cesar de Oliveira 2167 - Novo Eldorado',
            'Contagem - Minas Gerais - Cep:32044-120',
          ],
          phones: '(31) 2564-5971 | (31) 3396-0010',
          contact: 'Carlos Eduardo Soares da Silva',
          history: {
            planned: 1000,
            performed: 430,
            first: '01/01/2010 as 10:20:00 - João Filho Neto Sampaio',
            last: '04/12/2020 as 15:00:10 - Amanda Aparecida Lisb...',
          },
          permanence: {
            min: '00h:15 mim',
            med: '00h:55 mim',
            max: '02h:10 mim',
          },
        },
        check_in_data: {
          time: '09:10:21',
          type: 'code',
          attempts: 2,
          codePopup: {
            code: '102000',
            storeName: 'Hipermercado Extra C...',
            lines: [
              'Check realizado por código',
              'Fornecido por: Jeremy Ramirez',
              'Data: 10/09/2022 - 09:10:21',
              'Código utilizado: asd65464654d65',
            ],
          },
        },
        check_out_data: {
          time: '09:10:21',
          type: 'code',
          attempts: 2,
          codePopup: {
            code: '102000',
            storeName: 'Hipermercado Extra C...',
            lines: [
              'Check realizado por código',
              'Fornecido por: Jeremy Ramirez',
              'Data: 10/09/2022 - 09:10:21',
              'Código utilizado: asd65464654d65',
            ],
          },
        },
      },
      {
        status: <StatusCell label='Andamento' color='#FBCF30' />,
        route: 'GO 1245...',
        attendance_point: (
          <AttendancePointWithPopup name='Loja ATENTO BFI' />
        ),
        audit: '-',
        origin: 'Rota',
        planned: '30 min',
        check_in: null,
        check_out: null,
        permanence: '4h e 15 min',
        executor_role: (
          <ExecutorWithPopup
            name='Marcos da Silva N.'
            details={{
              avatarUrl: '/assets/images/profile.png',
              name: 'Marcos da Silva N.',
              role: '-',
              registration: '-',
              cpf: '-',
              re: '-',
              idc: '-',
              addressLines: ['-'],
              phones: '-',
              journey: '-',
              leader: { name: '-', phones: '-' },
              lastConnection: '-',
            }}
          />
        ),
        store_id: '2',
        store_name: 'Loja ATENTO BFI',
        store_address: buildAddress('Goiânia - GO'),
        check_in_data: { time: '09:10:21', type: 'photo', attempts: 0 },
        check_out_data: { time: '-', type: 'photo', attempts: 0 },
      },
      {
        status: <StatusCell label='Previsto' color='#3455AB' />,
        route: 'GO 1245...',
        attendance_point: (
          <AttendancePointWithPopup name='Extra Contagem' />
        ),
        audit: '-',
        origin: 'Rota',
        planned: '1h e 30 min',
        check_in: null,
        check_out: null,
        permanence: '-',
        executor_role: (
          <ExecutorWithPopup
            name='Marcos da Silva N.'
            details={{
              avatarUrl: '/assets/images/profile.png',
              name: 'Marcos da Silva N.',
              role: '-',
              registration: '-',
              cpf: '-',
              re: '-',
              idc: '-',
              addressLines: ['-'],
              phones: '-',
              journey: '-',
              leader: { name: '-', phones: '-' },
              lastConnection: '-',
            }}
          />
        ),
        store_id: '3',
        store_name: 'Extra Contagem',
        store_address: buildAddress('Contagem - MG'),
        check_in_data: { time: '-', type: 'photo', attempts: 120 },
        check_out_data: { time: '-', type: 'photo', attempts: 0 },
      },
      {
        status: <StatusCell label='Realizado' color='#66BB6A' />,
        route: 'SP 10',
        attendance_point: (
          <AttendancePointWithPopup name='Ponto Frio contagem...' />
        ),
        audit: '-',
        origin: 'Rota',
        planned: '15 min',
        check_in: null,
        check_out: null,
        permanence: '0h e 01 min',
        executor_role: (
          <ExecutorWithPopup
            name='Eudes Martins'
            details={{
              avatarUrl: '/assets/images/profile.png',
              name: 'Eudes Martins',
              role: '-',
              registration: '-',
              cpf: '-',
              re: '-',
              idc: '-',
              addressLines: ['-'],
              phones: '-',
              journey: '-',
              leader: { name: '-', phones: '-' },
              lastConnection: '-',
            }}
          />
        ),
        store_id: '4',
        store_name: 'Ponto Frio contagem...',
        store_address: buildAddress('Contagem - MG'),
        check_in_data: { time: '09:10:21', type: 'photo', attempts: 0 },
        check_out_data: { time: '09:10:21', type: 'photo', attempts: 2 },
      },
      {
        status: <StatusCell label='Não Realizado' color={RED} />,
        route: 'GOP44',
        attendance_point: (
          <AttendancePointWithPopup name='Supermercado Bh C...' />
        ),
        audit: 'Pendente',
        origin: 'Rota',
        planned: '1h e 00 min',
        check_in: null,
        check_out: null,
        permanence: '-',
        executor_role: (
          <ExecutorWithPopup
            name='Luiz Cadeia Louren...'
            details={{
              avatarUrl: '/assets/images/profile.png',
              name: 'Luiz Cadeia Louren...',
              role: '-',
              registration: '-',
              cpf: '-',
              re: '-',
              idc: '-',
              addressLines: ['-'],
              phones: '-',
              journey: '-',
              leader: { name: '-', phones: '-' },
              lastConnection: '-',
            }}
          />
        ),
        store_id: '5',
        store_name: 'Supermercado Bh C...',
        store_address: buildAddress('Belo Horizonte - MG'),
        check_in_data: { time: '-', type: 'photo', attempts: 0 },
        check_out_data: { time: '-', type: 'photo', attempts: 0 },
      },
      {
        status: <StatusCell label='Andamento' color='#FBCF30' />,
        route: 'GOP44',
        attendance_point: (
          <AttendancePointWithPopup name='Lojas Apoio Castelo' />
        ),
        audit: 'Pendente',
        origin: 'Carteira',
        planned: '3h e 00 min',
        check_in: null,
        check_out: null,
        permanence: '1h e 05min',
        executor_role: (
          <ExecutorWithPopup
            name='Luiz Cadeia Louren...'
            details={{
              avatarUrl: '/assets/images/profile.png',
              name: 'Luiz Cadeia Louren...',
              role: '-',
              registration: '-',
              cpf: '-',
              re: '-',
              idc: '-',
              addressLines: ['-'],
              phones: '-',
              journey: '-',
              leader: { name: '-', phones: '-' },
              lastConnection: '-',
            }}
          />
        ),
        store_id: '6',
        store_name: 'Lojas Apoio Castelo',
        store_address: buildAddress('Belo Horizonte - MG'),
        check_in_data: { time: '09:10:21', type: 'photo', attempts: 0 },
        check_out_data: {
          time: '09:10:21',
          type: 'web',
          attempts: 0,
          webPopup: {
            code: '102000',
            storeName: 'Lojas Apoio Castelo',
            lines: [
              'Check realizado pelo computador',
              'Por: Eudes Martins Soares',
              'IP: 192.168.002.120 - Net Service',
            ],
          },
        },
      },
      {
        status: (
          <StatusCell
            label='Justificado'
            color={RED}
            tooltip={{
              justify_at: '23:59:59',
              people_justify_name: 'Luiz Cadeia Louren...',
              reason: 'Check sem foto da self',
            }}
          />
        ),
        route: 'GOP44',
        attendance_point: (
          <AttendancePointWithPopup name='Assai Contagem' />
        ),
        audit: '-',
        origin: 'Carteira',
        planned: '10 min',
        check_in: null,
        check_out: null,
        permanence: '16h e 31min',
        executor_role: (
          <ExecutorWithPopup
            name='Luiz Cadeia Louren...'
            details={{
              avatarUrl: '/assets/images/profile.png',
              name: 'Luiz Cadeia Louren...',
              role: '-',
              registration: '-',
              cpf: '-',
              re: '-',
              idc: '-',
              addressLines: ['-'],
              phones: '-',
              journey: '-',
              leader: { name: '-', phones: '-' },
              lastConnection: '-',
            }}
          />
        ),
        store_id: '7',
        store_name: 'Assai Contagem',
        store_address: buildAddress('Contagem - MG'),
        check_in_data: { time: '09:10:21', type: 'gps', attempts: 2 },
        check_out_data: {
          time: '23:59:59',
          type: 'auto',
          attempts: 0,
          autoPopup: {
            code: '032215',
            storeName: 'Assai Contagem',
            description: 'Check realizado automaticamente pelo sistema.',
            condition: 'Condição: Termino da jornada ou encerramento do dia.',
          },
        },
      },
    ],
    [],
  )

  const rowsWithCheckCells: BodyInterface[] = useMemo(() => {
    return rows.map((row) => {
      const openModal = (type: 'check_in' | 'check_out') => {
        const isCheckIn = type === 'check_in'
        const check = isCheckIn ? row.check_in_data : row.check_out_data

        setOpen(
          <CheckValidationModal
            data={{
              title: `Dados de Validação do ${isCheckIn ? 'Checkin' : 'Checkout'}`,
              store_title: `${row.store_name} (${row.store_id})`,
              store_subtitle: row.store_address,
              options: [
                {
                  label: `Confirmar ${isCheckIn ? 'Checkin' : 'Checkout'}`,
                  component:
                    check.type === 'gps' ? (
                      <Map type={type} />
                    ) : (
                      <Photo
                        captionLeft={row.store_name}
                        captionRight={isCheckIn ? 'Checkin' : 'Checkout'}
                      />
                    ),
                },
                {
                  label: `Tentativa e falha (${check.attempts})`,
                  component: <Attempts attempts={check.attempts} />,
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
            onIconClick={() => openModal('check_in')}
          />
        ),
        check_out: (
          <CheckCell
            data={row.check_out_data}
            onIconClick={() => openModal('check_out')}
          />
        ),
      }
    })
  }, [rows])

  const [page, setPage] = useState<number>(1)
  const [isLastPage] = useState<boolean>(true)
  const totalRegistries = activeTab === 0 ? rows.length : teamRows.length

  const paginator = () => {
    // Mantemos apenas uma página por enquanto.
  }

  const reload = () => {
    // Quando a API for definida, este método será responsável por recarregar os dados.
  }

  const onClickExtractData = () => {
    // A integração da extração de dados será implementada quando o contrato da API estiver definido.
  }

  const onClickParcialGps = (row: BodyInterface) => {
    setOpen(
      <ParcialGpsModal
        row={row}
        onClose={() => setOpen(null)}
      />,
    )
  }

  const onClickRecusarAtendimento = () => {
    setModal(<RefuseAttendance close={() => setModal(null)} />)
  }

  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Parcial GPS',
        onClick: () => onClickParcialGps(item),
        rules: [],
      },
      {
        content: 'Recursar atendimento',
        onClick: () => onClickRecusarAtendimento(),
        rules: [],
      },
    ]
  }

  return (
    <React.Fragment>
      <Tabs
        options={[{ label: 'Panorama PDV' }, { label: 'Panorama Equipe' }]}
        active={{ active: activeTab, setActive: setActiveTab }}
        style={{ marginBottom: 12 }}
      />

      <Toolbar
        filters={{
          filters: activeTab === 0 ? filters : teamFilters,
          setAppliedFilters,
          appliedFilters,
        }}
        search={{ search, setSearch }}
        loading={false}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
        after={
          <DayPicker
            value={date}
            onChange={(next) => {
              setDate(next)
              setPage(1)
            }}
          />
        }
      >
        <MwButton size='small' content='Extrair Dados' onClick={onClickExtractData} />
      </Toolbar>

      {activeTab === 0 ? (
        <MwManager
          columns={header}
          rows={rowsWithCheckCells}
          sort={{ sort, setSort }}
          hasFilters={appliedFilters.length > 0 || search.length > 0}
          loading={false}
          paginator={paginator}
          getItemMenu={getItemMenu}
          page={page}
          setPage={setPage}
        />
      ) : (
        <MwManager
          columns={teamHeader}
          rows={teamRows}
          sort={{ sort, setSort }}
          hasFilters={appliedFilters.length > 0 || search.length > 0}
          loading={false}
          paginator={paginator}
          page={page}
          setPage={setPage}
        />
      )}

      <ManagerCounter
        partial={activeTab === 0 ? rows.length : teamRows.length}
        total={totalRegistries}
      />

      {activeTab === 0 ? modal : null}
      {activeTab === 0 ? open : null}
    </React.Fragment>
  )
}

export default Manager
