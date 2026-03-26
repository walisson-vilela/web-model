import { useEffect, useMemo, useState } from 'react'

import type { ColumnInterface } from '@mw-kit/mw-manager'
import {
  FiltersInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { profiles as profileOptions } from '../../../../../services/options'
import { DistributionCardData } from '../../interfaces'
import {
  listDistributionWorkers,
  removeDistributionWorkers,
} from '../../services'

type RemoveWorkersModalProps = {
  close: () => void
  distribution: DistributionCardData
  onRemoved?: () => void
}

type WorkerRow = {
  id: number
  name: string
  episCount: number
  role: string
  supervisor: string
}

const COLUMNS: ColumnInterface[] = [
  { content: 'Nome', key: 'name', textAlign: 'left', width: 6, sortKey : 'people_name' },
  { content: 'Qtde. EPI\'s', key: 'episCount', textAlign: 'center', width: 3, sortKey : 'epi_count' },
  { content: 'Perfil', key: 'role', textAlign: 'left', width: 4, sortKey : 'profile_name' },
  { content: 'Supervisor', key: 'supervisor', textAlign: 'left', width: 5, sortKey : 'supervisor_name' },
]

const RemoveWorkersModal = ({
  close,
  distribution,
  onRemoved,
}: RemoveWorkersModalProps) => {
  const [search, setSearch] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[]
  >([])
  const [selectedRows, setSelectedRows] = useState<WorkerRow[]>([])
  const [rows, setRows] = useState<WorkerRow[]>([])
  const [loading, setLoading] = useState(false)
  const [removing, setRemoving] = useState(false)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        const profileFilter = appliedFilters.find(
          (filter) => filter.name === 'profile_id',
        )
        const profileValue = Array.isArray(profileFilter?.value)
          ? profileFilter?.value[0]
          : profileFilter?.value
        const data = await listDistributionWorkers(distribution.id, {
          profileId: profileValue,
        })
        if (mounted) {
          setRows(
            data.map((worker) => ({
              id: Number(worker.id),
              name: `${worker.name}`,
              episCount: worker.epiCount,
              role: worker.profilesLabel,
              supervisor: worker.supervisorsLabel,
            })),
          )
        }
      } catch (error) {
        console.error(error)
        if (mounted) setRows([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [distribution.id, appliedFilters])

  const filteredWorkers = useMemo(() => {
    const text = search.trim().toLowerCase()
    if (!text) return rows

    return rows.filter((worker) => {
      return (
        worker.name.toLowerCase().includes(text) ||
        worker.role.toLowerCase().includes(text) ||
        worker.supervisor.toLowerCase().includes(text)
      )
    })
  }, [search, rows])

  const hasFilters = search.trim().length > 0 || appliedFilters.length > 0

  const handleDelete = async () => {
    try {
      setRemoving(true)
      const peopleIds = selectedRows.map((row) => row.id)
      await removeDistributionWorkers(distribution.id, peopleIds)
      toast(<ToasterContent color='normal' />, SuccessStyle)
      onRemoved?.()
      close()
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setRemoving(false)
    }
  }

  return (
    <Modal.Modal open size='large'>
      <Modal.Header color='blue'>Remover Colaboradores</Modal.Header>
      <Modal.Body style={{ padding: '16px 24px 24px' }}>
        <p
          style={{
            margin: '0 0 16px',
            color: '#6b7280',
            fontSize: 13,
          }}
        >
          Visualize aqui os colaboradores vinculados a distribuição que ainda
          não assinaram a distribuição.
        </p>

        <Modal.Toolbar.ManagerContainer>

          <Toolbar
            search={{ search, setSearch }}
            filters={{
              filters: [
                {
                  label: 'Perfil',
                  name: 'profile_id',
                  options: profileOptions,
                  allowEmptySearch: true,
                },
              ],
              appliedFilters,
              setAppliedFilters,
            }}
            except={{
              paginator: true,
              reloader: true,
              calendar: true,
              calendarInterval: true,
            }}
          />

          <MwManager
            columns={COLUMNS}
            rows={filteredWorkers}
            hasFilters={hasFilters}
            loading={loading}
            checkeds={{
              checkeds: selectedRows,
              setCheckeds: setSelectedRows,
            }}
            messages={{
              empty: 'Nenhum colaborador encontrado.',
              emptyWithFilters:
                'Nenhum colaborador encontrado com os filtros aplicados.',
            }}
          />
        </Modal.Toolbar.ManagerContainer>
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          type='button'
          content='Cancelar'
          appearance='borderless'
          size='large'
          onClick={close}
        />

        <MwButton
          type='button'
          content='Deletar'
          appearance='solid'
          size='large'
          color='red'
          disabled={selectedRows.length === 0 || removing}
          loading={removing}
          onClick={handleDelete}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default RemoveWorkersModal
