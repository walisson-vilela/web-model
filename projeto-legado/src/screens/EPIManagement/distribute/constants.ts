export const distributionActions = [
  { key: 'editDistributor', label: 'Editar Distribuidor' },
  { key: 'removeWorkers', label: 'Remover Colaboradores' },
] as const

export type DistributionActionKey = (typeof distributionActions)[number]['key']
