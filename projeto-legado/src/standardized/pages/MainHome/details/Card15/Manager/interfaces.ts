import type { ReactNode } from 'react'

export type ModelStoreScoreDetail = {
  score: number
  performed_by: string
  role: string
  collected_at: string
}

export type DataInterface = {
  id: number
  pdv_name: string
  group: string
  network: string
  flag: string
  cycle: string
  period: string
  model_store_score: number
  model_store_details: ModelStoreScoreDetail[]
  executor: string
  supervisor: string
}

export type BodyInterface = {
  id: number
  pdv_name: string
  group: string
  network: string
  flag: string
  cycle: string
  period: string
  model_store_score: ReactNode
}
