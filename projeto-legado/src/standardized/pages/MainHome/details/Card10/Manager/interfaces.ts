import type React from 'react'

export interface BodyInterface {
  name: string
  supervisor: string
  start_use: string
  visit: React.ReactNode
  service_time: React.ReactNode
  survey: React.ReactNode
  model_store: React.ReactNode
  absenteeism: React.ReactNode
  productivity: string
  idc: React.ReactNode
  idc_value: string
  idc_color: string
}
