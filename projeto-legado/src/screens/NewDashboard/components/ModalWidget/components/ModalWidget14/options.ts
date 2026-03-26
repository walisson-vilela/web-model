import Highcharts from 'highcharts'

const options1 = {
  chart: {
    type: 'solidgauge',
    backgroundColor: null,
  },

  title: null,

  pane: {
    center: ['50%', '85%'],
    size: '140%',
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
      innerRadius: '60%',
      outerRadius: '100%',
      shape: 'arc',
    },
  },
  credits: {
    enabled: false,
  },

  colors: ['#2D9AFF'],

  exporting: {
    enabled: false,
  },

  tooltip: {
    enabled: false,
  },
  series: [
    {
      name: '',
      data: [73],
      dataLabels: {
        format:
          '<div style="text-align:center">' +
          '<span style="font-size:17px">{y}%</span><br/>' +
          '<span style="font-size:12px;opacity:0.4"></span>' +
          '</div>',
      },
      tooltip: {
        valueSuffix: '%',
      },
    },
  ],

  yAxis: {
    labels: {
      enabled: false,
    },
    min: 0,
    max: 100,
    gridLineColor: 'transparent',
    lineColor: '#ccc',
    minorTickLength: 0,
    tickPositions: [73],
    tickColor: '#424242',
    tickPosition: 'inside',
    tickLength: 32,
    tickWidth: 3,
    zIndex: 100,
  },
  plotOptions: {
    solidgauge: {
      innerRadius: '60%',
      radius: '100%',
      dataLabels: {
        enabled: false,
        useHTML: true,
        zIndex: 1000, //added
      },
    },
  },
}

const options2 = {
  chart: {
    type: 'solidgauge',
    backgroundColor: null,
  },

  title: null,

  pane: {
    center: ['50%', '85%'],
    size: '140%',
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
      innerRadius: '60%',
      outerRadius: '100%',
      shape: 'arc',
    },
  },
  credits: {
    enabled: false,
  },

  colors: ['#2D9AFF'],

  exporting: {
    enabled: false,
  },

  tooltip: {
    enabled: false,
  },
  series: [
    {
      name: '',
      data: [80],
      dataLabels: {
        format:
          '<div style="text-align:center">' +
          '<span style="font-size:17px">{y}%</span><br/>' +
          '<span style="font-size:12px;opacity:0.4"></span>' +
          '</div>',
      },
      tooltip: {
        valueSuffix: '%',
      },
    },
  ],

  yAxis: {
    labels: {
      enabled: false,
    },
    min: 0,
    max: 100,
    gridLineColor: 'transparent',
    lineColor: '#ccc',
    minorTickLength: 0,
    tickPositions: [80],
    tickColor: '#424242',
    tickPosition: 'inside',
    tickLength: 32,
    tickWidth: 3,
    zIndex: 100,
  },
  plotOptions: {
    solidgauge: {
      innerRadius: '60%',
      radius: '100%',
      dataLabels: {
        enabled: false,
        useHTML: true,
        zIndex: 1000, //added
      },
    },
  },
}
export { options1, options2 }
