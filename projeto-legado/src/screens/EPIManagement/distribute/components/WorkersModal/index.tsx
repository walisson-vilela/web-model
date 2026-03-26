import { useEffect, useMemo, useState } from 'react'

import type { ColumnInterface } from '@mw-kit/mw-manager'
import {
  FiltersInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../components/MwModal'
import { profiles as profileOptions } from '../../../../../services/options'
import { DistributionCardData } from '../../interfaces'
import { listDistributionWorkers } from '../../services'

type WorkersModalProps = {
  close: () => void
  distribution: DistributionCardData
}

type WorkerRow = {
  id: string
  registry: string
  name: string
  profilesLabel: string
  supervisorsLabel: string
}

const COLUMNS: ColumnInterface[] = [
  { content: 'Matrícula', key: 'registry', textAlign: 'left', width: 3, sortKey: 'people_id' },
  { content: 'Nome', key: 'name', textAlign: 'left', width: 5, sortKey: 'people_name' },
  { content: 'Perfil', key: 'profilesLabel', textAlign: 'left', width: 4, sortKey: 'profile_name' },
  { content: 'Supervisor', key: 'supervisorsLabel', textAlign: 'left', width: 4, sortKey: 'supervisor_name' },
]

const WorkersModal = ({ close, distribution }: WorkersModalProps) => {
  const [search, setSearch] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[]
  >([])
  const [rows, setRows] = useState<WorkerRow[]>([])
  const [loading, setLoading] = useState(false)

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
        if (mounted) setRows(data)
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
        worker.registry.toLowerCase().includes(text) ||
        worker.name.toLowerCase().includes(text) ||
        worker.profilesLabel.toLowerCase().includes(text) ||
        worker.supervisorsLabel.toLowerCase().includes(text)
      )
    })
  }, [search, rows])

  const hasFilters = search.trim().length > 0

  return (
    <Modal.Modal open size='large'>
      <Modal.Header color='blue'>Colaboradores</Modal.Header>
      <Modal.Body style={{ padding: '16px 24px 24px' }}>
        <p
          style={{
            margin: '0 0 16px',
            color: '#192338',
            fontSize: 18,
          }}
        >
          Visualize aqui os colaboradores vinculados a distribuição.
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
            hasFilters={hasFilters || appliedFilters.length > 0}
            loading={loading}
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
          appearance='solid'
          className='primary'
          content='OK'
          onClick={close}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default WorkersModal

