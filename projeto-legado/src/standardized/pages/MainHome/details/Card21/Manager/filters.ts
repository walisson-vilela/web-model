import { FiltersInterfaces } from '@mw-kit/mw-manager'

const SUPERVISOR_OPTIONS: FiltersInterfaces.Option[] = [
  { label: '221060 - Jeremy Ramirez', value: 221060 },
  { label: '231565 - George Williamson', value: 231565 },
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

const YES_NO_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Sim', value: 'sim' },
  { label: 'Não', value: 'nao' },
]

const UPDATED_OUTDATED_OPTIONS: FiltersInterfaces.Option[] = [
  { label: 'Atualizada', value: 'updated' },
  { label: 'Desatualizada', value: 'outdated' },
]

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Supervisor',
    name: 'supervisor_id',
    options: buildSearchableLoader(SUPERVISOR_OPTIONS),
    allowEmptyString: true,
  },
  {
    label: 'Sistema Operacional',
    name: 'system',
    options: [
      { label: 'Android', value: 'android' },
      { label: 'IOS', value: 'ios' },
    ],
    allowEmptyString: true,
  },
  {
    label: 'Sincronização Pendente',
    name: 'sync_pending',
    options: YES_NO_OPTIONS,
    allowEmptyString: true,
  },
  {
    label: 'GPS off',
    name: 'gps_off',
    options: YES_NO_OPTIONS,
    allowEmptyString: true,
  },
  {
    label: 'Aparelho off',
    name: 'device_off',
    options: YES_NO_OPTIONS,
    allowEmptyString: true,
  },
  {
    label: 'Versão App',
    name: 'app_version',
    options: UPDATED_OUTDATED_OPTIONS,
    allowEmptyString: true,
  },
  {
    label: 'Base App',
    name: 'base_app',
    options: UPDATED_OUTDATED_OPTIONS,
    allowEmptyString: true,
  },
  {
    label: 'SmartScan',
    name: 'smart_scan',
    options: UPDATED_OUTDATED_OPTIONS,
    allowEmptyString: true,
  },
]

export default filters
