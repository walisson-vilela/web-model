export type DashboardHomeCardStatus = 'available' | 'soon'

export type DashboardHomeCardMetric = {
  label: string
  value: string
}

export type DashboardHomeCard = {
  id: string
  title: string
  description: string
  path: string
  ctaLabel: string
  status?: DashboardHomeCardStatus
  highlight?: DashboardHomeCardMetric
  meta?: DashboardHomeCardMetric
}
