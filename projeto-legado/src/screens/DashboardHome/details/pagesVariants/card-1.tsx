import React from 'react'

import Bullet from '../../../../components/Bullet'

import { coverageColumns } from '../columns/card-1'
import { coverageRows } from '../mocks/card-1'

const EXECUTOR_STATUS_COLORS: Record<string, string> = {
  active: '#19C172',
  inactive: '#E23851',
  inactive_temp: '#FBCF30',
  without_route: '#9CA3AF',
}

const ROUTE_STATUS_COLORS: Record<string, string> = {
  covered: '#19C172',
  partial: '#FBCF30',
  uncovered: '#E23851',
  without_route: '#9CA3AF',
}

export const getCard1Overrides = () => ({
  columns: coverageColumns,
  rows: coverageRows.map((row, index) => ({
    executor: row.executor,
    executorCell: (
      <span
        key={`executor-${index}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}
      >
        <Bullet color={EXECUTOR_STATUS_COLORS[row.executorStatus] || '#CBD5F5'} />
        <span>{row.executor}</span>
      </span>
    ),
    role: row.role,
    roleCell: (
      <span
        key={`role-${index}`}
        style={{ display: 'inline-flex', flexDirection: 'column', gap: 2 }}
      >
        <strong style={{ fontSize: 14, color: '#263046' }}>{row.role || '-'}</strong>
        {(row.hierarchyLevel || row.hierarchyName) ? (
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>
            {row.hierarchyLevel || '-'}
            {row.hierarchyLevel && row.hierarchyName ? ' | ' : row.hierarchyName ? '' : ''}
            {row.hierarchyName || (row.hierarchyLevel ? '' : '-')}
          </span>
        ) : (
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>-</span>
        )}
      </span>
    ),
    inactivationReason: row.inactivationReason || '-',
    role: row.role,
    directSupervisor: row.directSupervisor,
    routeName: row.routeName,
    routeCell: (
      <span
        key={`route-${index}`}
        style={{ display: 'inline-flex', flexDirection: 'column', gap: 2 }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          <Bullet color={ROUTE_STATUS_COLORS[row.routeStatus] || '#CBD5F5'} />
          <span>{row.routeName || '-'}</span>
        </span>
      <span style={{ fontSize: 12, color: '#9CA3AF' }}>{row.routeType || '-'}</span>
    </span>
  ),
  type: row.type,
  typeCell: (
    <span
      key={`type-${index}`}
      style={{ display: 'inline-flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}
    >
      <strong style={{ fontSize: 14, color: '#263046' }}>{row.type || '-'}</strong>
      <span style={{ fontSize: 12, color: '#9CA3AF' }}>
        Conexão Ativa: {row.connectionActive ? 'Sim' : 'Não'}
      </span>
    </span>
  ),
    area: row.area,
    plannedRoute: row.plannedRoute,
    actions: row.actions,
  })),
})
