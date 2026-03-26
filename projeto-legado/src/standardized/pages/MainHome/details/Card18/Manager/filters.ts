import { FiltersInterfaces } from '@mw-kit/mw-manager'

const SUPERVISOR_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Jeremy Ramirez', value: 'Jeremy Ramirez' },
  { label: 'George Williamson', value: 'George Williamson' },
]

const GROUP_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Grupo A', value: 'Grupo A' },
  { label: 'Grupo B', value: 'Grupo B' },
]

const NETWORK_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Rede 1', value: 'Rede 1' },
  { label: 'Rede 2', value: 'Rede 2' },
]

const FLAG_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Supermercado', value: 'Supermercado' },
  { label: 'Hipermercado', value: 'Hipermercado' },
  { label: 'Supernosso Gourmet', value: 'Supernosso Gourmet' },
]

const OCCURRENCE_TYPE_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Ruptura', value: 'Ruptura' },
  { label: 'Produtos vencendo', value: 'Produtos vencendo' },
  { label: 'Produtos com avaria', value: 'Produtos com avaria' },
  { label: 'Aguardando equipagem', value: 'Aguardando equipagem' },
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
    label: 'Grupo',
    name: 'group',
    options: buildSearchableLoader(GROUP_OPTIONS),
    allowEmptyString: true,
  },
  {
    label: 'Rede',
    name: 'network',
    options: buildSearchableLoader(NETWORK_OPTIONS),
    allowEmptyString: true,
  },
  {
    label: 'Bandeira',
    name: 'flag',
    options: buildSearchableLoader(FLAG_OPTIONS),
    allowEmptyString: true,
  },
  {
    label: 'Tipo Ocorrência',
    name: 'occurrence_type',
    options: buildSearchableLoader(OCCURRENCE_TYPE_OPTIONS),
    allowEmptyString: true,
  },
]

export default filters
