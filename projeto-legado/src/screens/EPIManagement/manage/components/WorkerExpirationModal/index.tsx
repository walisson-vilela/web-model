import React, { useEffect, useMemo, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import { MwManager, Toolbar } from '@mw-kit/mw-manager'
import type { ColumnInterface } from '@mw-kit/mw-manager'

import Modal from '../../../../../components/MwModal'
import {
  WorkerEpiRow,
  WorkerExpirationEpiRow,
  WorkerExpirationFilter,
} from '../../interfaces'
import { listWorkerEpisByExpiration } from '../../services'
import type { FiltersInterfaces, SortState } from '@mw-kit/mw-manager'

type WorkerExpirationModalProps = {
  close: () => void
  worker: WorkerEpiRow
  filter: WorkerExpirationFilter
}

const WorkerExpirationModal = ({
  close,
  worker,
  filter,
}: WorkerExpirationModalProps) => {
  const [rows, setRows] = useState<WorkerExpirationEpiRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[]
  >([])
  const [sort, setSort] = useState<SortState | null>(null)

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoading(true)
      try {
        const data = await listWorkerEpisByExpiration(worker.id, filter)
        if (mounted) setRows(data)
      } catch (error) {
        console.error(error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [worker.id, filter])

  const columns: ColumnInterface[] = useMemo(
    () => [
      { content: 'ID', key: 'id', textAlign: 'left', width: 3, sortKey: 'id' },
      {
        content: 'Tipo',
        key: 'type',
        textAlign: 'left',
        width: 4,
        sortKey: 'type',
      },
      {
        content: 'Qtde.',
        key: 'quantityFormatted',
        textAlign: 'center',
        width: 2,
        type: 'numeric',
        sortKey: 'quantity',
      },
      {
        content: 'Recebimento',
        key: 'receivedAtFormatted',
        textAlign: 'center',
        width: 3,
        type: 'date',
        sortKey: 'receivedAt',
      },
      {
        content: 'Vencimento',
        key: 'expiresAtFormatted',
        textAlign: 'center',
        width: 3,
        type: 'date',
        sortKey: 'expiresAt',
      },
      {
        content: 'Vence em',
        key: 'expiresInLabel',
        textAlign: 'center',
        width: 3,
        sortKey: 'expiresInValue',
      },
    ],
    [],
  )

  const formatDate = (value: string) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })
  }

  const body = useMemo(
    () =>
      rows.map((row) => ({
        ...row,
        quantityFormatted: row.quantity.toString().padStart(2, '0'),
        receivedAtFormatted: formatDate(row.receivedAt),
        expiresAtFormatted: formatDate(row.expiresAt),
        expiresInValue: parseInt(row.expiresInLabel, 10) || 0,
      })),
    [rows],
  )

  const filteredRows = useMemo(() => {
    const text = search.trim().toLowerCase()
    if (!text) return body

    return body.filter(
      (row) =>
        row.id.toLowerCase().includes(text) ||
        row.type.toLowerCase().includes(text),
    )
  }, [body, search])

  const hasFilters = search.trim().length > 0 || appliedFilters.length > 0

  return (
    <Modal.Modal open size='large'>
      <Modal.Header color='blue'>Lista de EPI&apos;s</Modal.Header>
      <Modal.Body style={{ padding: '16px 24px 24px' }}>
        <p
          style={{
            margin: '0 0 16px',
            fontSize: 13,
            color: '#6b7280',
          }}
        >
          Visualize aqui a lista de EPI&apos;s que estão para vencer.
        </p>

        <Toolbar
          search={{ search, setSearch }}
          filters={{
            filters: [],
            appliedFilters,
            setAppliedFilters,
          }}
          reloader={() => {
            // Recarrega dados sem alterar filtro
            listWorkerEpisByExpiration(worker.id, filter)
              .then((data) => setRows(data))
              .catch(console.error)
          }}
          loading={loading}
          except={{
            paginator: true,
            calendar: true,
            calendarInterval: true,
          }}
        />

        <Modal.Toolbar.ManagerContainer>
          <MwManager
            columns={columns}
            rows={filteredRows}
            hasFilters={hasFilters}
            loading={loading}
            sort={{ sort, setSort }}
            messages={{
              empty: 'Nenhum EPI encontrado.',
              emptyWithFilters:
                'Nenhum EPI encontrado com os filtros aplicados.',
            }}
          />
        </Modal.Toolbar.ManagerContainer>
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          appearance='solid'
          className='primary'
          content='OK'
          onClick={close}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default WorkerExpirationModal
