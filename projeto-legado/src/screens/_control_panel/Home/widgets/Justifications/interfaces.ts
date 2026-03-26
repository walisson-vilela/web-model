export interface DataInterface {
  chart: {
    series: {
      name: string
      colorByPoint: boolean
      data: {
        name: string
        y: number
        drilldown: string
        color: string
      }[]
    }[]

    drilldown: {
      series: {
        name: string
        id: string
        data: {
          name: string
          y: number
          drilldown: string
          color: string
        }[]
      }[]
      drillUpButton: {
        position: {
          align: string
          verticalAlign: string
          x: number
          y: number
        }
      }
    }
  }
}
