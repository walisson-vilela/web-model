import { FiltersInterfaces } from '@mw-kit/mw-manager'

const buildStaticOptionsLoader = (options: FiltersInterfaces.Option[]) => {
  return async (value: string | number | boolean) => {
    const q = String(value ?? '')
      .trim()
      .toLowerCase()

    if (!q) return options

    return options.filter((opt) => String(opt.label).toLowerCase().includes(q))
  }
}

const groupOptions: FiltersInterfaces.Option[] = [
  {
    label: 'GPA - Grupo Pão de açucar',
    value: 'GPA - Grupo Pão de açucar',
  },
  { label: 'Verdemar', value: 'Verdemar' },
  { label: 'Supernosso', value: 'Supernosso' },
  { label: 'BH', value: 'BH' },
]

const networkOptions: FiltersInterfaces.Option[] = [
  { label: 'Pão de Açúcar', value: 'Pão de Açúcar' },
  { label: 'Verdemar', value: 'Verdemar' },
  { label: 'Supernosso', value: 'Supernosso' },
  { label: 'BH', value: 'BH' },
]

const flagOptions: FiltersInterfaces.Option[] = [
  { label: 'Supermercado', value: 'Supermercado' },
  { label: 'Hipermercado', value: 'Hipermercado' },
  { label: 'Supernosso Gourmet', value: 'Supernosso Gourmet' },
]

const executorOptions: FiltersInterfaces.Option[] = [
  { label: '221060 - Rachel Patel', value: '221060 - Rachel Patel' },
  { label: '231565 - Julie Adams', value: '231565 - Julie Adams' },
  { label: '241543 - Jô Licon', value: '241543 - Jô Licon' },
  { label: '251777 - Carlos Soares', value: '251777 - Carlos Soares' },
]

const supervisorOptions: FiltersInterfaces.Option[] = [
  { label: '221060 - Jeremy Ramirez', value: '221060 - Jeremy Ramirez' },
  { label: '231565 - George Williamson', value: '231565 - George Williamson' },
  { label: '201535 - Eudes Martins', value: '201535 - Eudes Martins' },
]

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Grupo',
    name: 'group',
    options: buildStaticOptionsLoader(groupOptions),
    allowEmptySearch: true,
  } as unknown as FiltersInterfaces.Filter,
  {
    label: 'Rede',
    name: 'network',
    options: buildStaticOptionsLoader(networkOptions),
    allowEmptySearch: true,
  } as unknown as FiltersInterfaces.Filter,
  {
    label: 'Bandeira',
    name: 'flag',
    options: buildStaticOptionsLoader(flagOptions),
    allowEmptySearch: true,
  } as unknown as FiltersInterfaces.Filter,
  {
    label: 'Executor',
    name: 'executor',
    options: buildStaticOptionsLoader(executorOptions),
    allowEmptySearch: true,
  } as unknown as FiltersInterfaces.Filter,
  {
    label: 'Supervisor',
    name: 'supervisor',
    options: buildStaticOptionsLoader(supervisorOptions),
    allowEmptySearch: true,
  } as unknown as FiltersInterfaces.Filter,
]

export default filters
