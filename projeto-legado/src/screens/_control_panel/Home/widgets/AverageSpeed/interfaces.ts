export interface DataInterface {
  chart: {
    series: {
      name: string
      data: number[]
      tooltip: {
        valueSuffix: string
      }
    }[]
  }
}
