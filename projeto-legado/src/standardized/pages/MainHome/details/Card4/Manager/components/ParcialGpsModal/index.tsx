import React, { useMemo } from 'react'

import type { DropdownInterfaces } from '@mw-kit/mw-manager'

import type { BodyInterface } from '../../interfaces'
import { CheckValidationModal } from '../Modal'
import { Map } from '../Modal/components'

type Props = {
  row: BodyInterface
  onClose: () => void
}

const BLUE = '#3455ab'
const GREEN = '#66BB6A'
const RED = '#E23851'

type MonitoringItem = {
  label: string
  precision?: string
  time: string
  color: string
}

const MonitoringContent = () => {
  const items: MonitoringItem[] = useMemo(
    () => [
      { label: 'Check-In', precision: '0.37 m', time: '09:10:00', color: BLUE },
      { label: 'Dentro do Raio', precision: '0.57 m', time: '09:30:00', color: GREEN },
      {
        label: 'GPS Desativado Pelo Usuário',
        time: '09:50:00',
        color: RED,
      },
      { label: 'Fora do Raio', time: '10:10:00', color: RED },
    ],
    [],
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 16 }}>
      <div>
        <div style={{ fontWeight: 600, margin: '12px 0 10px' }}>
          Dados do Monitoramento
        </div>

        <div style={{ border: '1px solid #e5e7eb' }}>
          {items.map((item) => (
            <div
              key={`${item.label}-${item.time}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '6px 1fr auto',
                gap: 12,
                padding: 14,
                borderBottom: '1px solid #f3f4f6',
                alignItems: 'center',
              }}
            >
              <div style={{ width: 6, height: '100%', background: item.color }} />

              <div>
                <div style={{ fontWeight: 700 }}>{item.label}</div>
                {item.precision ? (
                  <div style={{ marginTop: 2, color: '#6b7280' }}>
                    Precisão: {item.precision}
                  </div>
                ) : null}
              </div>

              <div style={{ color: '#111827', minWidth: 70, textAlign: 'right' }}>
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ height: 20 }} />
        <Map type='check_in' />
      </div>
    </div>
  )
}

const ParcialGpsModal: React.FC<Props> = (props) => {
  const { row, onClose } = props

  const userName = row.executor_details?.name ?? '—'
  const registration = row.executor_details?.registration ?? '—'

  const roteiro = typeof row.route === 'string' ? row.route : ''

  return (
    <CheckValidationModal
      data={{
        title: 'Parcial GPS',
        store_title: `Usuário: ${userName} | Matrícula: ${registration}`,
        store_subtitle: `PDV: ${row.store_name}${roteiro ? ` | Roteiro: ${roteiro}` : ''}`,
        options: [
          { label: 'Dentro do raio', component: <MonitoringContent /> },
          { label: 'Fora do raio', component: <MonitoringContent /> },
          { label: 'GPS Desligado', component: <MonitoringContent /> },
          { label: 'Dispositivo Mobile Desligado', component: <MonitoringContent /> },
        ],
        onClose,
      }}
    />
  )
}

export default ParcialGpsModal

export const getParcialGpsMenuItem = (
  item: BodyInterface,
  onClick: () => void,
): DropdownInterfaces.Item => {
  return {
    content: 'Parcial GPS',
    onClick,
    rules: [],
  }
}
