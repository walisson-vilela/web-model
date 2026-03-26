import type React from 'react'

export interface BodyInterface {
  name: string
  status: string
  status_label: React.ReactNode
  supervisor: string
  hierarchy: string
  first_battery_day: string
  current_reading: string
  avg_consumption: string
  system_activity_label: React.ReactNode
}
