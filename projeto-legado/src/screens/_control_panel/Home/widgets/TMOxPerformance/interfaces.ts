export interface DataInterface {
  chart: {
    series: {
      name: string
      type: 'column' | 'spline'
      data: number[]
      yAxis?: number
      color?: string
    }[]
  }
}
