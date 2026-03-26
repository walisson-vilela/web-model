import type { Options as HighchartsOptions } from 'highcharts'

export type Hierarchy = {
  id: number
  name: string
}

export type HierarchyStructure = {
  id: number
  name: string
  level: number
}

export type HierarchyLevel = {
  id: number
  name: string
  structure: HierarchyStructure
}

export type Area = {
  id: number
  name: string
}

export type CardData = {
  id: string
  title: string
  content: string
}

export type Card1Data = {
  actives: number
  inactives: number
  covered_routes: number
  uncovered_routes: number
  total_routes: number
  without_route: number
  coverage_percentage: number
  status_color: string
  legend: {
    title: string
    values: { color: string; label: string }[]
  }
}

export type Card2Data = {
  total_users: number
  no_attendance: number
  adherence: number
  status_color: string
  legend: {
    title: string
    values: { color: string; label: string }[]
  }
}

export type Card3Data = {
  total_users: number
  started: number
  started_percentage: number
  no_started: number
  no_started_percentage: number
  two_hours: number
  four_hours: number
  one_day: number
  status_color: string
  legend: {
    title: string
    values: { color: string; label: string }[]
  }
}

export type Card4Data = {
  total_attendances: number
  planned: number
  uncovered?: number
  not_planned: number
  justified: number
  in_progress: number
  realized: number
  punctuality?: number
  performance: number
  status_color: string
  legend: {
    title: string
    values: { color: string; label: string }[]
  }
}

export type Card5Data = {
  high: number
  high_percentage: number
  medium: number
  medium_percentage: number
  low: number
  low_percentage: number
  average_consumption: number
  status_color: string
  legend: {
    title: string
    values: { color: string; label: string }[]
  }
}

export type Card6Data = {
  registries: number
  photos: number
  users_impacted: number
  status_color: string
  legend: {
    title: string
    values: { color: string; label: string }[]
  }
}

export type Card7Data = {
  goal: number
  scheduled: number
  below_scheduled: number
  below_scheduled_percentage: number
  above_scheduled: number
  above_scheduled_percentage: number
  chart_data: HighchartsOptions
}

export type Card8Data = {
  chart_data: HighchartsOptions
}

export type Card9Data = {
  very_bad: number
  bad: number
  neutral: number
  good: number
  great: number
}

export type Card10Data = {
  idc: number
  productivity: number
}

export type Card11Data = {
  planned: number
  realized: number
}

export type Card12Data = {
  chart_data: HighchartsOptions
}

export type Card13Data = {
  chart_data: HighchartsOptions
}

export type Card14LegendValue = {
  label: string
  realized: number
  reach: number
}

export type Card14Data = {
  realized: number
  reach: number
  legend: {
    title: string
    values: Card14LegendValue[]
  }
}

export type Card15Data = {
  goal: number
  result: number
  max_score: number
  below_goal: number
  above_goal: number
}

export type Card16Period = 'today' | 'd-1' | 'week' | 'month' | '60-days'

export type Card16Detail = {
  label: string
  count: number
}

export type Card16Data = {
  chart_data: HighchartsOptions
  total: number
  details: Card16Detail[]
}

export type Card17Period = 'week' | 'month' | '60-days'

export type Card17Detail = {
  label: string
  count: number
}

export type Card17Data = {
  chart_data: HighchartsOptions
  total: number
  details: Card17Detail[]
}

export type Card18Data = {
  month: string
  total: number
  new: number
  viewed: number
}

export type Card19Data = {
  occurrences: number
}

export type Card20Data = {
  check_in: number
  check_in_percentage: number
  check_out: number
  check_out_percentage: number
}

export type Card21Data = {
  android: number
  ios: number
  outdated_apps: number
}
