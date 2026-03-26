const options = {
  chart: {
    type: 'column',
    backgroundColor: null,
  },
  title: {
    text: '',
  },
  loading: true,
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
    labels: {
      enabled: false,
    },
    stackLabels: {
      enabled: false,
      align: 'center',
    },
    visible: false,
  },
  plotOptions: {
    column: {
      stacking: 'normal',
    },
  },
  credits: {
    enabled: false,
  },
  legend: false,

  colors: ['#3CC37B', '#E23851'],
  series: [
    {
      name: 'Justificados',
      data: [],
    },
    {
      name: 'Não justificados',
      data: [],
    },
  ],
}

export { options }
