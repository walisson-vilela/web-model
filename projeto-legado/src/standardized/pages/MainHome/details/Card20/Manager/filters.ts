import { FiltersInterfaces } from '@mw-kit/mw-manager'

const SUPERVISOR_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Jeremy Ramirez', value: 'Jeremy Ramirez' },
  { label: 'George Williamson', value: 'George Williamson' },
]

const ORIGIN_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Rota', value: 'Rota' },
  { label: 'Carteira', value: 'Carteira' },
]

const createPagedOptionsLoader = (
  allOptions: FiltersInterfaces.Option[],
): FiltersInterfaces.OptionsCallback => {
  return async (value: string, page?: number) => {
    const query = String(value ?? '').trim().toLowerCase()

    const filtered = query
      ? allOptions.filter((option) => {
        return String(option.label).toLowerCase().includes(query)
      })
      : allOptions

    const PAGE_SIZE = 10
    const currentPage = page || 1
    const start = Math.max(0, (currentPage - 1) * PAGE_SIZE)
    const end = start + PAGE_SIZE
    const options = filtered.slice(start, end)
    const lastPage = end >= filtered.length

    return { options, lastPage }
  }
}

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Supervisor',
    name: 'supervisor',
    options: createPagedOptionsLoader(SUPERVISOR_OPTIONS),
    allowEmptyString: true,
  },
  {
    label: 'Origem',
    name: 'origin',
    options: ORIGIN_OPTIONS,
    allowEmptyString: true,
  },
]

export default filters
