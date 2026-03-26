import { FiltersInterfaces } from '@mw-kit/mw-manager'

const JUSTIFICATION_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Atestado médico', value: 'Atestado médico' },
  { label: 'Loja Fechada', value: 'Loja Fechada' },
  { label: 'Alteração de Roteiro', value: 'Alteração de Roteiro' },
  {
    label: 'PDV fora da carteira do promotor',
    value: 'PDV fora da carteira do promotor',
  },
  { label: 'Reunião', value: 'Reunião' },
]

const FLAG_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Supermercado', value: 'Supermercado' },
  { label: 'Hipermercado', value: 'Hipermercado' },
  { label: 'Supernosso Gourmet', value: 'Supernosso Gourmet' },
]

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

const justificationOptionsLoader: FiltersInterfaces.OptionsCallback = async (
  value: string,
  page?: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  const query = String(value ?? '').trim().toLowerCase()

  const filtered = query
    ? JUSTIFICATION_OPTIONS.filter((option) => {
      return String(option.label).toLowerCase().includes(query)
    })
    : JUSTIFICATION_OPTIONS

  const PAGE_SIZE = 10
  const currentPage = page || 1
  const start = Math.max(0, (currentPage - 1) * PAGE_SIZE)
  const end = start + PAGE_SIZE
  const options = filtered.slice(start, end)
  const lastPage = end >= filtered.length

  return { options, lastPage }
}

const flagOptionsLoader: FiltersInterfaces.OptionsCallback = async (
  value: string,
  page?: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  const query = String(value ?? '').trim().toLowerCase()

  const filtered = query
    ? FLAG_OPTIONS.filter((option) => {
      return String(option.label).toLowerCase().includes(query)
    })
    : FLAG_OPTIONS

  const PAGE_SIZE = 10
  const currentPage = page || 1
  const start = Math.max(0, (currentPage - 1) * PAGE_SIZE)
  const end = start + PAGE_SIZE
  const options = filtered.slice(start, end)
  const lastPage = end >= filtered.length

  return { options, lastPage }
}

const supervisorOptionsLoader: FiltersInterfaces.OptionsCallback = async (
  value: string,
  page?: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  const query = String(value ?? '').trim().toLowerCase()

  const filtered = query
    ? SUPERVISOR_OPTIONS.filter((option) => {
      return String(option.label).toLowerCase().includes(query)
    })
    : SUPERVISOR_OPTIONS

  const PAGE_SIZE = 10
  const currentPage = page || 1
  const start = Math.max(0, (currentPage - 1) * PAGE_SIZE)
  const end = start + PAGE_SIZE
  const options = filtered.slice(start, end)
  const lastPage = end >= filtered.length

  return { options, lastPage }
}

const groupOptionsLoader: FiltersInterfaces.OptionsCallback = async (
  value: string,
  page?: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  const query = String(value ?? '').trim().toLowerCase()

  const filtered = query
    ? GROUP_OPTIONS.filter((option) => {
      return String(option.label).toLowerCase().includes(query)
    })
    : GROUP_OPTIONS

  const PAGE_SIZE = 10
  const currentPage = page || 1
  const start = Math.max(0, (currentPage - 1) * PAGE_SIZE)
  const end = start + PAGE_SIZE
  const options = filtered.slice(start, end)
  const lastPage = end >= filtered.length

  return { options, lastPage }
}

const networkOptionsLoader: FiltersInterfaces.OptionsCallback = async (
  value: string,
  page?: number,
): Promise<FiltersInterfaces.OptionsReturn | FiltersInterfaces.Option[]> => {
  const query = String(value ?? '').trim().toLowerCase()

  const filtered = query
    ? NETWORK_OPTIONS.filter((option) => {
      return String(option.label).toLowerCase().includes(query)
    })
    : NETWORK_OPTIONS

  const PAGE_SIZE = 10
  const currentPage = page || 1
  const start = Math.max(0, (currentPage - 1) * PAGE_SIZE)
  const end = start + PAGE_SIZE
  const options = filtered.slice(start, end)
  const lastPage = end >= filtered.length

  return { options, lastPage }
}

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Supervisor',
    name: 'supervisor',
    options: supervisorOptionsLoader,
    allowEmptyString: true,
  },
  {
    label: 'Grupo',
    name: 'group',
    options: groupOptionsLoader,
    allowEmptyString: true,
  },
  {
    label: 'Rede',
    name: 'network',
    options: networkOptionsLoader,
    allowEmptyString: true,
  },
  {
    label: 'Bandeira',
    name: 'flag',
    options: flagOptionsLoader,
    allowEmptyString: true,
  },
  {
    label: 'Justificativa',
    name: 'justification',
    options: justificationOptionsLoader,
    allowEmptyString: true,
  },
]

export default filters
