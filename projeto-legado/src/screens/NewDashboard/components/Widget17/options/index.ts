const options = {
  colors: ['#E23851', '#66BB6A'],
  chart: {
    type: 'bar',
    backgroundColor: null,
  },
  title: {
    text: '',
  },
  xAxis: {
    categories: '',
  },
  credits: {
    enabled: false,
  },

  yAxis: {
    labels: {
      enabled: false,
      format: '',
    },
    title: null,
    softMax: 100,
    max: 100,
  },
  legend: {
    reversed: false,
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: false,
      },
    },
  },

  series: [
    {
      name: 'TMO -',
      data: [300],
    },
    {
      name: 'TMO+',
      data: [400],
    },
  ],
}

export { options }
