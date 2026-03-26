interface PercentageDuration {
  percentage: number | null
  duration: number | null
}

export interface Details {
  name: string | null
  function: string | null
  registration: string | null
  journey: {
    date: string | null
    start: string | null
    end: string | null
    diff: string | null
  } | null
  tmo: {
    scheduled: {
      percent: number | null
      hours: string | null
    }
    realized: {
      percent: number | null
      hours: string | null
    }
  } | null
  attendance: {
    scheduled: {
      pdvs: number | null
    }
    realized: {
      pdvs: number | null
      percent: number | null
    }
  } | null
}

export interface PerformanceDetailsProps {
  data: Details
}
