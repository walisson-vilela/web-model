import { FiltersInterfaces } from '@mw-kit/mw-manager'

const SUPERVISOR_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Jeremy Ramirez', value: 'Jeremy Ramirez' },
  { label: 'George Williamson', value: 'George Williamson' },
]

const ROLE_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Promotor', value: 'Promotor' },
  { label: 'Supervisor', value: 'Supervisor' },
]

const REASON_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Atestado Médico', value: 'Atestado Médico' },
  { label: 'Afastamento', value: 'Afastamento' },
  { label: 'Ferias', value: 'Ferias' },
  { label: 'Desligamento', value: 'Desligamento' },
  { label: 'Licença Paternidade', value: 'Licença Paternidade' },
]

const buildSearchableLoader = (baseOptions: FiltersInterfaces.Option[]) => {
  const loader: FiltersInterfaces.OptionsCallback = async (
    value: string,
    page?: number,
  ): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
    const query = String(value ?? '').trim().toLowerCase()

    const filtered = query
      ? baseOptions.filter((option) => {
        return String(option.label).toLowerCase().includes(query)
      })
      : baseOptions

    const PAGE_SIZE = 10
    const currentPage = page || 1
    const start = Math.max(0, (currentPage - 1) * PAGE_SIZE)
    const end = start + PAGE_SIZE
    const options = filtered.slice(start, end)
    const lastPage = end >= filtered.length

    return { options, lastPage }
  }

  return loader
}

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Supervisor',
    name: 'supervisor',
    options: buildSearchableLoader(SUPERVISOR_OPTIONS),
    allowEmptyString: true,
  },
  {
    label: 'Função',
    name: 'role',
    options: buildSearchableLoader(ROLE_OPTIONS),
    allowEmptyString: true,
  },
  {
    label: 'Motivo',
    name: 'reason',
    options: buildSearchableLoader(REASON_OPTIONS),
    allowEmptyString: true,
  },
]

export default filters
