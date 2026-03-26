import React from 'react'

import { ColumnInterface, MwManager, Toolbar } from '@mw-kit/mw-manager'
import { Checkbox } from 'semantic-ui-react'

import {
  ColumnCard,
  ColumnContent as CardContent,
  ColumnHeader,
  Columns,
} from '../styles'

const mockEpis = [
  { id: 1, name: 'Jaleco' },
  { id: 2, name: 'Bota' },
  { id: 3, name: 'Óculos' },
  { id: 4, name: 'Luva' },
  { id: 5, name: 'Protetor Auricular' },
  { id: 6, name: 'Uniforme' },
]

const mockWorkers = [
  { id: 102030, name: 'Rachel Patel', profile: 'Promotor' },
  { id: 152535, name: 'Julie Adams', profile: 'Promotor' },
  { id: 162636, name: 'Jó Licon', profile: 'Promotor' },
  { id: 172737, name: 'Carlos Soares', profile: 'Supervisor' },
  { id: 182838, name: 'Marina Silva', profile: 'Promotor' },
  { id: 201535, name: 'Cristiano Sampaio', profile: 'Supervisor' },
  { id: 253543, name: 'Carme Adams', profile: 'Promotor' },
]

const StepOne = () => {
  const [selectedEpis, setSelectedEpis] = React.useState<number[]>([])
  const [selectedWorkers, setSelectedWorkers] = React.useState<number[]>([])
  const [epiSearch, setEpiSearch] = React.useState('')
  const [workerSearch, setWorkerSearch] = React.useState('')

  const filteredEpis = React.useMemo(() => {
    if (!epiSearch.trim()) return mockEpis
    return mockEpis.filter((epi) =>
      epi.name.toLowerCase().includes(epiSearch.toLowerCase()),
    )
  }, [epiSearch])

  const filteredWorkers = React.useMemo(() => {
    if (!workerSearch.trim()) return mockWorkers
    const term = workerSearch.toLowerCase()
    return mockWorkers.filter(
      (worker) =>
        worker.name.toLowerCase().includes(term) ||
        worker.id.toString().includes(term),
    )
  }, [workerSearch])

  const toggleEpi = (id: number) => {
    setSelectedEpis((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const toggleWorker = (id: number) => {
    setSelectedWorkers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const epiColumns: ColumnInterface[] = [
    { content: '', key: 'checkbox', width: 1 },
    { content: '', key: 'name', width: 15 },
  ]

  const epiRows = filteredEpis.map((epi) => ({
    id: epi.id,
    checkbox: (
      <Checkbox
        checked={selectedEpis.includes(epi.id)}
        onChange={() => toggleEpi(epi.id)}
      />
    ),
    name: epi.name,
  }))

  const workerColumns: ColumnInterface[] = [
    { content: '', key: 'checkbox', width: 1 },
    { content: '', key: 'info', width: 11 },
    { content: '', key: 'profile', width: 4, textAlign: 'right' },
  ]

  const workerRows = filteredWorkers.map((worker) => ({
    id: worker.id,
    checkbox: (
      <Checkbox
        checked={selectedWorkers.includes(worker.id)}
        onChange={() => toggleWorker(worker.id)}
      />
    ),
    info: `${worker.id} - ${worker.name}`,
    profile: worker.profile,
  }))

  const allEpisSelected =
    filteredEpis.length > 0 &&
    filteredEpis.every((epi) => selectedEpis.includes(epi.id))

  const allWorkersSelected =
    filteredWorkers.length > 0 &&
    filteredWorkers.every((worker) => selectedWorkers.includes(worker.id))

  const toggleAllEpis = () => {
    if (allEpisSelected) {
      setSelectedEpis((prev) =>
        prev.filter((id) => !filteredEpis.some((epi) => epi.id === id)),
      )
    } else {
      const ids = filteredEpis.map((epi) => epi.id)
      setSelectedEpis((prev) => Array.from(new Set([...prev, ...ids])))
    }
  }

  const toggleAllWorkers = () => {
    if (allWorkersSelected) {
      setSelectedWorkers((prev) =>
        prev.filter((id) => !filteredWorkers.some((worker) => worker.id === id)),
      )
    } else {
      const ids = filteredWorkers.map((worker) => worker.id)
      setSelectedWorkers((prev) => Array.from(new Set([...prev, ...ids])))
    }
  }

  return (
    <Columns>
      <ColumnCard>
        <ColumnHeader>EPI&apos;s</ColumnHeader>

        <CardContent>
          <Toolbar
            search={{
              search: epiSearch,
              setSearch: setEpiSearch,
            }}
            except={{
              filters: true,
              applied: true,
              paginator: true,
              calendar: true,
              calendarInterval: true,
              reloader: true,
            }}
            before={
              <Checkbox
                checked={allEpisSelected}
                onChange={toggleAllEpis}
                label={`Selecionar todos (${selectedEpis.length})`}
              />
            }
          />

          <MwManager
            columns={epiColumns}
            rows={epiRows}
            sort={{ sort: null, setSort: () => {} }}
            loading={false}
            hasFilters={false}
            page={1}
            setPage={() => {}}
          />
        </CardContent>
      </ColumnCard>

      <ColumnCard>
        <ColumnHeader>Colaboradores</ColumnHeader>

        <CardContent>
          <Toolbar
            search={{
              search: workerSearch,
              setSearch: setWorkerSearch,
            }}
            filters={{
              filters: [],
              appliedFilters: [],
              setAppliedFilters: () => {},
            }}
            except={{
              paginator: true,
              calendar: true,
              calendarInterval: true,
              reloader: true,
            }}
            before={
              <Checkbox
                checked={allWorkersSelected}
                onChange={toggleAllWorkers}
                label={`Selecionar todos (${selectedWorkers.length})`}
              />
            }
          />

          <MwManager
            columns={workerColumns}
            rows={workerRows}
            sort={{ sort: null, setSort: () => {} }}
            loading={false}
            hasFilters={false}
            page={1}
            setPage={() => {}}
          />
        </CardContent>
      </ColumnCard>
    </Columns>
  )
}

export default StepOne
