import type React from 'react'

export type CheckType = 'gps' | 'photo' | 'web' | 'auto' | 'code'

export type AutoCheckPopupData = {
  code: string
  storeName: string
  description: string
  condition: string
}

export type WebCheckPopupData = {
  code: string
  storeName: string
  lines: string[]
}

export type CodeCheckPopupData = {
  code: string
  storeName: string
  lines: string[]
}

export type CheckCellData = {
  time: string
  type: CheckType
  attempts: number

  // popup usado para checks automáticos (ícone de cronômetro)
  autoPopup?: AutoCheckPopupData

  // popup usado para checks web (ícone web)
  webPopup?: WebCheckPopupData

  // popup usado para checks por código (ícone de código)
  codePopup?: CodeCheckPopupData
}

export type PdvDetails = {
  id: number
  name: string
  document: string
  markets: string
  addressLines: string[]
  phones: string
  contact: string
  history: {
    planned: number
    performed: number
    first: string
    last: string
  }
  permanence: {
    min: string
    med: string
    max: string
  }
}

export type ExecutorDetails = {
  avatarUrl?: string
  name: string
  role: string
  registration: string
  cpf: string
  re: string
  idc: string
  addressLines: string[]
  phones: string
  journey: string
  leader: {
    name: string
    phones: string
  }
  lastConnection: string
}

export interface BodyInterface {
  status: React.ReactNode
  route: string
  attendance_point: React.ReactNode
  audit: string
  origin: string
  planned: string
  check_in: React.ReactNode
  check_out: React.ReactNode
  permanence: string
  executor_role: React.ReactNode
  actions?: React.ReactNode

  // dados auxiliares do PDV para o modal
  store_id: string
  store_name: string
  store_address: string
  store_details?: PdvDetails

  executor_details?: ExecutorDetails

  check_in_data: CheckCellData
  check_out_data: CheckCellData
}
