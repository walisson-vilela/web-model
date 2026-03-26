export type WorkerStatus = 'ok' | 'warning' | 'blocked'

export type WorkerExpirationFilter =
  | 'expiring90'
  | 'expiring60'
  | 'expiring30'
  | 'expired'

export interface WorkerEpiRow {
  id: number
  name: string
  status: WorkerStatus
  active: boolean
  episReceived: number | null
  expiring90: number | null
  expiring60: number | null
  expiring30: number | null
  expired: number | null
}

export interface WorkerEpiDistributionItem {
  id: number
  name: string
  quantity: number
}

export interface WorkerEpiDistribution {
  id: number
  distributionCode: string
  deliveredAt: string
  deliveredBy: string
  items: WorkerEpiDistributionItem[]
  totalDelivered: number
}

export interface WorkerExpirationEpiRow {
  id: string
  type: string
  quantity: number
  receivedAt: string
  expiresAt: string
  expiresInLabel: string
}
