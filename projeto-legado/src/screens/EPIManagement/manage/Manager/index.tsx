import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { DropdownInterfaces, MwManager, Toolbar } from '@mw-kit/mw-manager'
import { Button } from 'semantic-ui-react'

import ManagerCounter from '../../../../components/ManagerCounter'
import { ManagerProps } from '../../../interfaces'
import filters from '../filters'
import header from '../header'
import { WorkerEpiRow, WorkerExpirationFilter } from '../interfaces'
import { listWorkersEpiStatus } from '../services'
import EpisReceivedModal from '../components/EpisReceivedModal'
import WorkerExpirationModal from '../components/WorkerExpirationModal'

const ManageManager: React.FC<ManagerProps> = (props) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [rows, setRows] = useState<WorkerEpiRow[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [isLastPage, setIsLastPage] = useState(false)
  const [totalRegistries, setTotalRegistries] = useState(0)
  const [episModalWorker, setEpisModalWorker] = useState<WorkerEpiRow | null>(
    null,
  )
  const [expirationModal, setExpirationModal] = useState<{
    worker: WorkerEpiRow
    filter: WorkerExpirationFilter
  } | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const response = await listWorkersEpiStatus({
        appliedFilters,
        search,
        sort,
        page,
      })

      const { has_next_page = false, count = 0 } = response.pagination || {}
      setIsLastPage(!has_next_page)
      setTotalRegistries(count)

      const results = response.data || []
      setRows((prev) => (page === 1 ? results : prev.concat(results)))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters, search, sort, page])

  useEffect(() => {
    loadData()
  }, [loadData])

  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }

  const paginator = () => {
    if (!isLastPage) {
      setPage((prev) => prev + 1)
    }
  }

  const formatCount = (value: number | null): string => {
    if (value === null || value === undefined) return '-'
    return value.toString().padStart(2, '0')
  }

  const getBulletColor = (active: boolean): string => {
    return active ? '#10B981' : '#EF4444'
  }

  const body = useMemo(
    () =>
      rows.map((row) => ({
        ...row,
        name: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: getBulletColor(row.active),
              }}
            />
            <span>{row.name}</span>
          </div>
        ),
        episReceivedFormatted: (
          <button
            type='button'
            style={{
              border: 'none',
              background: 'transparent',
              padding: 0,
              cursor:
                row.episReceived === null || row.episReceived === undefined
                  ? 'default'
                  : 'pointer',
              color: 'inherit',
              font: 'inherit',
            }}
            onClick={() => {
              if (row.episReceived === null || row.episReceived === undefined)
                return
              setEpisModalWorker(row)
            }}
          >
            {formatCount(row.episReceived)}
          </button>
        ),
        expiring90Formatted:
          row.expiring90 === null || row.expiring90 === undefined ? (
            formatCount(row.expiring90)
          ) : (
            <button
              type='button'
              style={{
                border: 'none',
                background: 'transparent',
                padding: 0,
                cursor: 'pointer',
                color: 'inherit',
                font: 'inherit',
              }}
              onClick={() =>
                setExpirationModal({ worker: row, filter: 'expiring90' })
              }
            >
              {formatCount(row.expiring90)}
            </button>
          ),
        expiring60Formatted:
          row.expiring60 === null || row.expiring60 === undefined ? (
            formatCount(row.expiring60)
          ) : (
            <button
              type='button'
              style={{
                border: 'none',
                background: 'transparent',
                padding: 0,
                cursor: 'pointer',
                color: 'inherit',
                font: 'inherit',
              }}
              onClick={() =>
                setExpirationModal({ worker: row, filter: 'expiring60' })
              }
            >
              {formatCount(row.expiring60)}
            </button>
          ),
        expiring30Formatted:
          row.expiring30 === null || row.expiring30 === undefined ? (
            formatCount(row.expiring30)
          ) : (
            <button
              type='button'
              style={{
                border: 'none',
                background: 'transparent',
                padding: 0,
                cursor: 'pointer',
                color: 'inherit',
                font: 'inherit',
              }}
              onClick={() =>
                setExpirationModal({ worker: row, filter: 'expiring30' })
              }
            >
              {formatCount(row.expiring30)}
            </button>
          ),
        expiredFormatted:
          row.expired === null || row.expired === undefined ? (
            '-'
          ) : (
            <button
              type='button'
              style={{
                border: 'none',
                background: 'transparent',
                padding: 0,
                cursor: 'pointer',
                color: row.expired > 0 ? '#EF4444' : '#111827',
                font: 'inherit',
              }}
              onClick={() =>
                setExpirationModal({ worker: row, filter: 'expired' })
              }
            >
              {formatCount(row.expired)}
            </button>
          ),
      })),
    [rows],
  )

  const getItemMenu = useCallback(
    (item: WorkerEpiRow): DropdownInterfaces.Item[] => [
      {
        content: 'Interagir',
        onClick: () => {
          console.info('interact-worker', item)
        },
        rules: [],
      },
    ],
    [],
  )

  return (
    <>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      >
        <Button
          primary
          size='tiny'
          content='Extrair Dados'
          onClick={() => {
            console.info('extract-data: epi-management-manage')
          }}
        />
      </Toolbar>

      <MwManager
        columns={header}
        rows={body}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={loading}
        paginator={paginator}
        page={page}
        setPage={setPage}
        getItemMenu={getItemMenu}
      />

      <ManagerCounter partial={rows.length} total={totalRegistries} />

      {episModalWorker && (
        <EpisReceivedModal
          worker={episModalWorker}
          close={() => setEpisModalWorker(null)}
        />
      )}

      {expirationModal && (
        <WorkerExpirationModal
          worker={expirationModal.worker}
          filter={expirationModal.filter}
          close={() => setExpirationModal(null)}
        />
      )}
    </>
  )
}

export default ManageManager
