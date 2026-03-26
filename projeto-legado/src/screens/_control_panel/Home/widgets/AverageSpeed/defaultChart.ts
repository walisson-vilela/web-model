import { HighchartsOptionsModified } from '../../interfaces'

const defaultChart: HighchartsOptionsModified = {
  chart: {
    alignTicks: false,
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'gauge',
    height: 180,
    width: 180,
  },
  credits: {
    enabled: false,
  },
  title: {
    text: '',
  },
  pane: {
    startAngle: -150,
    endAngle: 150,
  },
  yAxis: {
    min: 0,
    max: 60,
    tickPixelInterval: 120,
    tickPosition: 'inside',
    tickColor: '#263046',
    tickLength: 10,
    tickInterval: 5,
    minorTickLength: 5,
    minorTickInterval: 1,
    minorTickColor: '#263046',
    labels: {
      rotation: 'auto',
      distance: -23,
      style: {
        fontSize: '12px',
      },
    },
    plotBands: [
      {
        from: 0,
        to: 5,
        color: '#DF5353',
        thickness: 10,
      },
      {
        from: 5,
        to: 10,
        color: '#DF6F45',
        thickness: 10,
      },
      {
        from: 10,
        to: 15,
        color: '#DE8B37',
        thickness: 10,
      },
      {
        from: 15,
        to: 20,
        color: '#DEA729',
        thickness: 10,
      },
      {
        from: 20,
        to: 25,
        color: '#DDC31B',
        thickness: 10,
      },
      {
        from: 25,
        to: 30,
        color: '#DDDF0D',
        thickness: 10,
      },
      {
        from: 30,
        to: 35,
        color: '#C6DA15',
        thickness: 10,
      },
      {
        from: 35,
        to: 40,
        color: '#B0D41C',
        thickness: 10,
      },
      {
        from: 40,
        to: 45,
        color: '#99CF24',
        thickness: 10,
      },
      {
        from: 45,
        to: 50,
        color: '#82CA2C',
        thickness: 10,
      },
      {
        from: 50,
        to: 55,
        color: '#6CC433',
        thickness: 10,
      },
      {
        from: 55,
        to: 60,
        color: '#55BF3B',
        thickness: 10,
      },
    ],
  },
  series: [
    {
      type: 'gauge',
      name: 'Velocidade Média',
      dataLabels: {
        format: '{y} km/h',
        borderWidth: 0,
        color: '#333333',
        style: {
          fontSize: '16px',
        },
      },
      tooltip: {
        valueSuffix: ' km/h',
      },
      data: [0],
    },
  ],
}

export default defaultChart
