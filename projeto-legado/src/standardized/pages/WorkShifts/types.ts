export type WeekdayType = {
  weekday: number
  weekday_label: string
  starts_at: string
  ends_at: string
  flag: boolean
}

export type WorkShift = {
  /** ID */
  id: number

  /** Status */
  active: boolean
  active_label: string

  /** Tipo Turno */
  electronic_point: boolean
  electronic_point_label: string

  /** Frequência */
  weekdays: WeekdayType[]

  /** Carga Horária (S) */
  workload: number
  workload_label: string

  /** Intervalo (D) */
  average_interval: number
  average_interval_label: string

  /** Usuário */
  user_count: number
}
