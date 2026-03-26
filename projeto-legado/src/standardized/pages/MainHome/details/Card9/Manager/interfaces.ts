import type React from 'react'

export interface BodyInterface {
  name: string
  role: string
  status: React.ReactNode
  supervisor: string
  last_notification: string
  classification: React.ReactNode
  observation: string
}
