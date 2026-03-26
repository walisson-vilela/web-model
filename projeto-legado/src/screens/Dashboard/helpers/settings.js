/* Range Setting -> configurações para exibição da barra de limite similar ao widget14
series: [{
    name: '',
    data: [75],
    dataLabels: {
        format:
            '<div style="text-align:center">' +
            '<span style="font-size:17px">{y}%</span><br/>' +
            '<span style="font-size:12px;opacity:0.4"></span>' +
            '</div>'
    },
    tooltip: {
        valueSuffix: '%'
    }
}],

yAxis: {
    labels: {
        enabled: false
      },
      min: 0,
      max: 100,
      gridLineColor: 'transparent',
      lineColor: '#ccc',
      minorTickLength: 0,
      tickPositions: [0],
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
        zIndex: 1000 //added
      }
    }
},
*/
