import React from 'react'

export interface BodyInterface {
  id: number
  name: string
  status: boolean
  name_jsx: React.ReactNode
  role_name: string | null
  inactivation_reason_name: string | null
  supervisor_name: string | null
  route_names: string | null
}

export type Data = {
  ['region']: {
    name: string
  }
  ['work-shift']: {
    eletronic_point_label: string
  }
}

export type AssociatedUsersProps<By extends keyof Data> = {
  close: () => void
  by: By
  data: {
    id: number
    count: number
  } & Data[By]
}
