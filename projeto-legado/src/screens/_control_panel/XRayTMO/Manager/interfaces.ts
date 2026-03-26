export interface DataInterface {
  id: number | null
  route_name: string | null
  people_id: number | null
  people_name: string | null
  supervisor_name: string | null
  impact: number | null
  monday_tmo: number | null
  monday_date: string | null
  monday_planned: number | null
  tuesday_tmo: number | null
  tuesday_planned: number | null
  tuesday_date: string | null
  wednesday_tmo: number | null
  wednesday_planned: number
  wednesday_date: string | null
  thursday_tmo: number | null
  thursday_planned: number
  thursday_date: string | null
  friday_tmo: number | null
  friday_planned: number
  friday_date: string | null
  saturday_tmo: number | null
  saturday_planned: number | null
  saturday_date: string | null
  sunday_tmo: number | null
  sunday_planned: number | null
  sunday_date: string | null
  tmo_positive: number | null
  tmo_negative: number | null
}

export interface BodyInterface {
  id: number | null
  route_name: string
  people_id: number
  people_name: string
  supervisor_name: string
  impact: number
  impact_jsx: JSX.Element | null
  monday_tmo: number
  monday_planned: number | null
  tuesday_tmo: number
  tuesday_planned: number
  wednesday_tmo: number
  wednesday_planned: number
  thursday_tmo: number
  thursday_planned: number
  friday_tmo: number
  friday_planned: number
  saturday_tmo: number
  saturday_planned: number
  sunday_tmo: number
  sunday_planned: number
  tmo_positive: number
  tmo_negative: number
  monday_tmo_jsx: JSX.Element | null | string
  tuesday_tmo_jsx: JSX.Element | null | string
  wednesday_tmo_jsx: JSX.Element | null | string
  thursday_tmo_jsx: JSX.Element | null | string
  friday_tmo_jsx: JSX.Element | null | string
  saturday_tmo_jsx: JSX.Element | null | string
  sunday_tmo_jsx: JSX.Element | null | string
  tmo_positive_jsx: JSX.Element | null | string
  tmo_negative_jsx: JSX.Element | null | string
  monday_date: string | null
  tuesday_date: string | null
  wednesday_date: string | null
  thursday_date: string | null
  friday_date: string | null
  saturday_date: string | null
  sunday_date: string | null
}
