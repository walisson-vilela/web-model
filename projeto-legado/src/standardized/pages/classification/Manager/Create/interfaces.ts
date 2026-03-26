import React from 'react'

import { UseFormReturn } from 'react-hook-form'

import { BodyInterface } from '../interfaces'

export interface Form {
  name: string
  scenery_id: number | ''
  temporary: boolean | null
  required_file: boolean
}

export interface CreateProps {
  setOpen: React.Dispatch<React.SetStateAction<JSX.Element>>
  editData?: BodyInterface
  loadData: () => Promise<void>
}

export type Scenery = {
  temporary: boolean
  can_upload_file: boolean
}

export type Context = {
  data?: BodyInterface
  form: UseFormReturn<Form>
  scenery: [Scenery, React.Dispatch<React.SetStateAction<Scenery>>]
}
