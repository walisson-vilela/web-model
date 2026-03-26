import { ValidationError } from 'yup'

export type Days = {
  days: number[]
}

export type Period = {
  start_date: string // data inicio
  end_date: string // data termino
}

type Journey = {
  type: 'J'
}

type Interval = {
  type: 'I'
  label: string // nome do intervalo
  time_limit_lock: string // hora limite
  pre_marked: boolean // pre assinalado
}

export type WorkDate = {
  start_time: string // hora inicio
  end_time: string // hora termino
} & (Journey | Interval) &
  (Days | Period)

type NotEletronicPoint = {
  electronic_point: false
}

type EletronicPoint = {
  electronic_point: true

  tolerance_min: number | ''
  tolerance_max: number | ''
}

export type SystemAccessTime = (NotEletronicPoint | EletronicPoint) & {
  work_dates: WorkDate[]
}

export interface Props {
  system_access_time: SystemAccessTime
  close: () => void
  save: (system_access_time: SystemAccessTime) => void
}

type GetKeys<T> = T extends T ? keyof T : never

type FormState<T extends string> = {
  submits: number
  errors: Partial<Record<T, ValidationError>>
  validating: boolean
}

export type WorkDateForm = FormState<GetKeys<WorkDate>>

export type SystemAccessTimeForm = FormState<
  Exclude<GetKeys<SystemAccessTime>, 'work_dates'>
>
