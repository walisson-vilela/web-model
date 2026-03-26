import type React from 'react'

export type ImpactLevel = 'low' | 'moderate' | 'high'

export interface BodyInterface {
  impact: React.ReactNode
  route_name: React.ReactNode
  supervisor: string
  executor: React.ReactNode
  d: React.ReactNode
  s: React.ReactNode
  t: React.ReactNode
  q1: React.ReactNode
  q2: React.ReactNode
  s1: React.ReactNode
  s2: React.ReactNode
  tmo_plus: React.ReactNode
  tmo_minus: React.ReactNode
}
