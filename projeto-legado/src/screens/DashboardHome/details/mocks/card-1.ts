export type CoverageRow = {
  executor: string
  executorStatus: 'active' | 'inactive' | 'inactive_temp' | 'without_route'
  executorStatusLabel: string
  inactivationReason: string
  role: string
  hierarchyLevel: string
  hierarchyName: string
  directSupervisor: string
  routeName: string
  routeStatus: 'covered' | 'partial' | 'uncovered' | 'without_route'
  routeType: string
  type: string
  connectionActive: boolean
  area: string
  plannedRoute: string
  actions?: string
}

export const coverageRows: CoverageRow[] = [
  {
    executor: 'Ana Costa',
    executorStatus: 'active',
    executorStatusLabel: 'Ativa',
    inactivationReason: 'Férias programadas',
    role: 'Promotora Senior',
    hierarchyLevel: 'Nível 4',
    hierarchyName: 'Execução',
    directSupervisor: 'Carlos Santos',
    routeName: 'Rota 103 - Zona Sul',
  routeStatus: 'covered',
  routeType: 'Coberto Total',
  type: 'Fixo',
  connectionActive: true,
  area: 'Sul',
    plannedRoute: 'Rota 103',
    actions: '…',
  },
  {
    executor: 'Bruno Lima',
    executorStatus: 'inactive_temp',
    executorStatusLabel: 'Inativo Temp.',
    inactivationReason: 'Licença médica',
    role: 'Vendedor KA',
    hierarchyLevel: 'Nível 3',
    hierarchyName: 'Comercial',
    directSupervisor: 'Rita Araújo',
    routeName: 'Rota 254 - Interior',
  routeStatus: 'partial',
  routeType: 'Coberto Parcial',
  type: 'Móvel',
  connectionActive: false,
    area: 'Sudeste',
    plannedRoute: 'Rota 254',
    actions: '…',
  },
  {
    executor: 'Camila Souza',
    executorStatus: 'inactive',
    executorStatusLabel: 'Inativo',
    inactivationReason: 'Transferência interna',
    role: 'Supervisora',
    hierarchyLevel: 'Nível 5',
    hierarchyName: 'Gestão',
    directSupervisor: 'Felipe Torres',
    routeName: 'Rota 412 - Capital',
  routeStatus: 'uncovered',
  routeType: 'Sem Cobertura',
  type: 'Fixo',
  connectionActive: false,
    area: 'Centro-Oeste',
    plannedRoute: 'Rota 412',
    actions: '…',
  },
  {
    executor: 'Diego Martins',
    executorStatus: 'without_route',
    executorStatusLabel: 'Sem roteiro',
    inactivationReason: 'Sem justificativa',
    role: 'Promotor Júnior',
    hierarchyLevel: 'Nível 4',
    hierarchyName: 'Execução',
    directSupervisor: 'Renata Rocha',
    routeName: 'Rota 98 - Litoral',
  routeStatus: 'without_route',
  routeType: 'Sem Rota',
  type: 'Móvel',
  connectionActive: false,
    area: 'Nordeste',
    plannedRoute: 'Rota 98',
    actions: '…',
  },
]
