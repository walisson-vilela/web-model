export interface DataInterface {
  chart: {
    series: {
      name: string
      colorByPoint: boolean
      data: {
        name: string
        y: number
      }[]
    }[]
  }
}
