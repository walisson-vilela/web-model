export type DistributionInfo = {
  label: string
  value: string
}

export type DistributionStatus = {
  label: string
  color: string
}

export interface DistributionCardData {
  id: number
  code: string
  epiName: string
  workerName: string
  workerRegistry: string
  workerRole: string
  workplace: string
  deliveryDate: string
  quantity: string
  status: DistributionStatus
  createdBy: {
    name: string
    registry: string
    createdAt: string
  }
  distributedBy: {
    name: string
    registry: string
  }
  totalItems: number
  allowEditEpis: boolean
  epiTypesCount: number
  epiTypesSummary?: DistributionEpiType[]
  workersCount: number
  signaturesSignedCount: number
  signaturesExpectedCount: number
  signatures: {
    done: number
    pending: number
    signed: DistributionSignature[]
    pendingList?: DistributionSignature[]
  }
  details: DistributionInfo[]
  history: DistributionInfo[]
  conferenceList?: DistributionConferenceEpi[]
}

export interface DistributionSignature {
  id: number
  signer: {
    name: string
    registry: string
    role: string
    supervisor: string
    workArea: string
  }
  audit: {
    hash: string
    systemId: string
    device?: string
    ip: string
    signedAt: string
    faceBiometryValidated: boolean
  }
  episDeliveredCount: number
  epis: DistributionSignatureEpi[]
  hasPartialDelivery?: boolean
  contractUrl?: string
  episBadge?: boolean
}

export interface DistributionSignatureEpi {
  id: number
  label: string
  quantity: number
  size?: string
}

export interface DistributionConferenceSize {
  id: number
  label: string
  quantity: number
}

export interface DistributionConferenceEpi {
  id: number
  name: string
  sizes: DistributionConferenceSize[]
}

export interface DistributionEpiType {
  id: number
  name: string
  quantity: number
}
