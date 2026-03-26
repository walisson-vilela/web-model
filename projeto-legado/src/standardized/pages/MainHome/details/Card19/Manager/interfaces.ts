import type { ReactNode } from 'react'

export type CheckType = 'gps' | 'photo'

export type CheckCellData = {
  time: string
  type: CheckType
  attempts: number
}

export interface BodyInterface {
  name: string
  route: string
  pdv: string
  audit: string
  check_in: ReactNode
  attendance_time: string
  check_out: ReactNode
  occurrences: ReactNode

  check_in_data: CheckCellData
  check_out_data: CheckCellData
  occurrences_count: number
}
