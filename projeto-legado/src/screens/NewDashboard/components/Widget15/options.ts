const options = {
  chart: {
    type: 'column',
    backgroundColor: null,
  },
  title: {
    text: null,
  },

  yAxis: {
    title: {
      text: null,
    },
    softMax: 100,
    max: 100,
  },

  xAxis: {
    title: {
      text: null,
    },
    style: {
      fontWeight: 'normal',
    },
    stackLabels: {
      enabled: false,
      align: 'center',
    },
    visible: false,
  },
  legend: false,

  credits: {
    enabled: false,
  },
  colors: ['#1E63A3', '#2D9AFF'],
  series: [
    {
      name: 'S-1',
      data: [],
    },
    {
      name: 'S0',
      data: [],
    },
  ],
}

export { options }
