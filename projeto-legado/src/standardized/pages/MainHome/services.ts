import type {
  Card1Data,
  Card2Data,
  Card3Data,
  Card4Data,
  Card5Data,
  Card6Data,
  Card7Data,
  Card8Data,
  Card9Data,
  Card10Data,
  Card11Data,
  Card12Data,
  Card13Data,
  Card14Data,
  Card15Data,
  Card16Data,
  Card16Period,
  Card17Data,
  Card17Period,
  Card18Data,
  Card19Data,
  Card20Data,
  Card21Data,
  CardData,
  Hierarchy,
  HierarchyLevel,
  Area,
} from './types'

export const fetchHierarchies = async (): Promise<Hierarchy[]> => {
  return Promise.resolve<Hierarchy[]>([
    { id: 1, name: 'Trade' },
    { id: 2, name: 'Merchandising' },
    { id: 3, name: 'Vendas' },
  ])
}

export const fetchHierarchyLevels = async (
  hierarchyId: number,
): Promise<HierarchyLevel[]> => {
  const baseLevels: HierarchyLevel[] = [
    {
      id: 1,
      name: 'Alpha 549 A5 Track',
      structure: {
        id: 101,
        name: 'Diretor',
        level: 1,
      },
    },
    {
      id: 2,
      name: 'Beta Origin',
      structure: {
        id: 102,
        name: 'Gerente',
        level: 2,
      },
    },
    {
      id: 3,
      name: 'Gama Strike',
      structure: {
        id: 103,
        name: 'Supervisor',
        level: 3,
      },
    },
  ]

  const offset = hierarchyId * 10

  return Promise.resolve(
    baseLevels.map((level) => ({
      ...level,
      id: level.id + offset,
      structure: {
        ...level.structure,
        id: level.structure.id + offset,
      },
    })),
  )
}

export const fetchAreas = async (hierarchyId: number): Promise<Area[]> => {
  const baseAreas: Area[] = [
    { id: 1, name: 'Betim - Contagem 06' },
    { id: 2, name: 'Região Metropolitana' },
    { id: 3, name: 'Central Mineira' },
    { id: 4, name: 'Zona Sul' },
    { id: 5, name: 'Zona Norte' },
  ]

  const offset = hierarchyId * 10

  return Promise.resolve(
    baseAreas.map((area) => ({
      ...area,
      id: area.id + offset,
    })),
  )
}

const mockCard1Data = (): Card1Data => ({
  actives: 800,
  inactives: 200,
  covered_routes: 700,
  uncovered_routes: 100,
  total_routes: 800,
  without_route: 100,
  coverage_percentage: 87,
  status_color: '#19c172',
  legend: {
    title: 'Cobertura dos roteiros',
    values: [
      { color: '#19c172', label: 'Igual a 100%' },
      { color: '#E23851', label: 'Abaixo de 100%' },
    ],
  },
})

export const fetchCard1Data = async (): Promise<Card1Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard1Data()
}

const mockCard2Data = (): Card2Data => ({
  total_users: 250,
  no_attendance: 50,
  adherence: 80,
  status_color: '#f4c043',
  legend: {
    title: 'Aderência ao Atendimento',
    values: [
      { color: '#E23851', label: '0% - 75%' },
      { color: '#F4C043', label: '75% - 95%' },
      { color: '#19C172', label: '95% - 100%' },
    ],
  },
})

export const fetchCard2Data = async (): Promise<Card2Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard2Data()
}

const mockCard3Data = (): Card3Data => ({
  total_users: 250,
  started: 150,
  started_percentage: 60,
  no_started: 100,
  no_started_percentage: 40,
  two_hours: 3,
  four_hours: 5,
  one_day: 30,
  status_color: '#e23851',
  legend: {
    title: 'Desconectados',
    values: [
      { color: '#19C172', label: '0% - 10%' },
      { color: '#F4C043', label: '10% - 20%' },
      { color: '#E23851', label: 'Acima de 20%' },
    ],
  },
})

export const fetchCard3Data = async (): Promise<Card3Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard3Data()
}

const mockCard4Data = (): Card4Data => ({
  total_attendances: 399,
  planned: 384,
  uncovered: 20,
  not_planned: 15,
  justified: 4,
  in_progress: 100,
  realized: 280,
  punctuality: 43.7,
  performance: 73,
  status_color: '#e23851',
  legend: {
    title: 'Pontualidade',
    values: [
      { color: '#1B65F1', label: 'Neutro' },
      { color: '#E23851', label: '0% - 75%' },
      { color: '#F4C043', label: '75% - 95%' },
      { color: '#19C172', label: '98% - 100%' },
    ],
  },
})

export const fetchCard4Data = async (): Promise<Card4Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard4Data()
}

const mockCard5Data = (): Card5Data => ({
  high: 150,
  high_percentage: 60,
  medium: 90,
  medium_percentage: 36,
  low: 10,
  low_percentage: 4,
  average_consumption: -10,
  status_color: '#19C172',
  legend: {
    title: 'Consumo Médio',
    values: [
      { color: '#19C172', label: '0% - 10%' },
      { color: '#E23851', label: 'Acima de 10%' },
    ],
  },
})

export const fetchCard5Data = async (): Promise<Card5Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard5Data()
}

const mockCard6Data = (): Card6Data => ({
  registries: 95,
  photos: 100,
  users_impacted: 200,
  status_color: '#f4c043',
  legend: {
    title: 'Usuários Impactados',
    values: [
      { color: '#19C172', label: '0% - 10%' },
      { color: '#F4C043', label: '10% - 20%' },
      { color: '#E23851', label: 'Acima de 20%' },
    ],
  },
})

export const fetchCard6Data = async (): Promise<Card6Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard6Data()
}

const mockCard7Data = (): Card7Data => ({
  goal: 5,
  scheduled: 80,
  below_scheduled: 20,
  below_scheduled_percentage: 3.5,
  above_scheduled: 8,
  above_scheduled_percentage: 20,
  chart_data: {
    chart: {
      type: 'spline',
      backgroundColor: 'transparent',
      height: 140,
      margin: [0, 0, 0, 0],
    },
    title: { text: undefined },
    xAxis: {
      visible: false,
    },
    yAxis: {
      maxPadding: 0.2,
      minPadding: 0.2,
      gridLineWidth: 0,
    },
    legend: { enabled: false },
    tooltip: { enabled: false },
    credits: { enabled: false },
    plotOptions: {
      series: {
        marker: { enabled: false },
        lineWidth: 3,
      },
    },
    series: [
      {
        type: 'spline',
        data: [4.8, 5.5, 4.9, 5.7, 4.2, 3.8, 5.4],
        color: '#E23851',
      },
      {
        type: 'spline',
        data: [3.7, 3.5, 3.8, 3.4, 3.9, 3.6, 3.7],
        color: '#19C172',
      },
    ],
    plotLines: [],
  },
})

export const fetchCard7Data = async (): Promise<Card7Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard7Data()
}

const mockCard8Data = (): Card8Data => ({
  chart_data: {
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 10,
      lineWidth: 0,
      labels: {
        distance: -15,
        style: { color: '#374151', fontSize: '11px' },
      },
      plotBands: [
        { from: 0, to: 50, color: '#30c48d', thickness: 12 },
        { from: 50, to: 70, color: '#f2cb40', thickness: 12 },
        { from: 70, to: 85, color: '#f28e2b', thickness: 12 },
        { from: 85, to: 100, color: '#e23851', thickness: 12 },
      ],
    },
    series: [
      {
        type: 'gauge',
        name: 'Velocidade',
        data: [32],
        tooltip: { enabled: false },
      },
    ],
    credits: { enabled: false },
  },
})

export const fetchCard8Data = async (): Promise<Card8Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard8Data()
}

const mockCard9Data = (): Card9Data => ({
  very_bad: 10,
  bad: 20,
  neutral: 56,
  good: 2,
  great: 0,
})

export const fetchCard9Data = async (): Promise<Card9Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard9Data()
}

const mockCard10Data = (): Card10Data => ({
  idc: 2.3,
  productivity: 67,
})

export const fetchCard10Data = async (): Promise<Card10Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard10Data()
}

const mockCard11Data = (): Card11Data => ({
  planned: 5.7,
  realized: 7.3,
})

export const fetchCard11Data = async (): Promise<Card11Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard11Data()
}

const mockCard12Data = (): Card12Data => ({
  chart_data: {
    series: [
      {
        type: 'bar',
        data: [85, 10],
      },
    ],
  },
})

export const fetchCard12Data = async (): Promise<Card12Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard12Data()
}

const mockCard13Data = (): Card13Data => ({
  chart_data: {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
    },
    title: { text: undefined },
    credits: { enabled: false },
    xAxis: {
      categories: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      crosshair: true,
    },
    yAxis: [
      {
        title: { text: 'TMO' },
        min: 0,
        max: 200,
      },
      {
        title: { text: 'Performance' },
        min: 0,
        max: 200,
        opposite: true,
      },
    ],
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      column: {
        borderRadius: 4,
      },
      series: {
        marker: {
          enabled: true,
          radius: 4,
        },
      },
    },
    series: [
      {
        type: 'column',
        name: 'TMO',
        data: [80, 120, 100, 40, 0, 180, 110],
        color: '#3b82f6',
        yAxis: 0,
      },
      {
        type: 'spline',
        name: 'Performance',
        data: [20, 80, 60, 30, 10, 90, 70],
        color: '#10b981',
        yAxis: 1,
      },
    ],
  },
})

export const fetchCard13Data = async (): Promise<Card13Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard13Data()
}

const mockCard14Data = (): Card14Data => ({
  realized: 88.7,
  reach: 98,
  legend: {
    title: 'Tarefas por ciclo de execuções',
    values: [
      { label: 'Diária', realized: 25.3, reach: 99.5 },
      { label: 'Semanal', realized: 25.3, reach: 99.5 },
      { label: 'Quinzenal', realized: 25.3, reach: 99.5 },
      { label: 'Mensal', realized: 25.3, reach: 99.5 },
      { label: 'Demais', realized: 25.3, reach: 99.5 },
    ],
  },
})

export const fetchCard14Data = async (): Promise<Card14Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard14Data()
}

const mockCard15Data = (): Card15Data => ({
  goal: 9,
  result: 8.1,
  max_score: 10,
  below_goal: 300,
  above_goal: 600,
})

export const fetchCard15Data = async (): Promise<Card15Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard15Data()
}

const mockCard16Data = (period: Card16Period): Card16Data => {
  const baseTotal = 232

  const baseChart: Card16Data['chart_data'] = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
    },
    title: { text: undefined },
    credits: { enabled: false },
    xAxis: {
      categories: [''],
      lineWidth: 0,
      tickWidth: 0,
      labels: { enabled: false },
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 20,
      title: { text: undefined },
      lineWidth: 1,
      lineColor: '#e5e7eb',
      gridLineWidth: 0,
      labels: {
        style: { color: '#6b7280', fontSize: '11px' },
      },
    },
    tooltip: {
      shared: true,
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
    },
    plotOptions: {
      series: {
        borderWidth: 0,
      },
    },
    series: [
      {
        type: 'bar',
        name: 'Justificado',
        data: [40],
        color: '#3b82f6',
      },
      {
        type: 'bar',
        name: 'Não Justificado',
        data: [60],
        color: '#bfdbfe',
      },
    ],
  }

  const baseDetails = [
    { label: 'Atendimento médico', count: 5 },
    { label: 'Tempo de atendimento maior em loja', count: 20 },
    { label: 'Reunião', count: 10 },
    { label: 'Recebimento de mercadoria em outra loja', count: 50 },
    { label: 'Afastamento', count: 35 },
    { label: 'Alteração de Roteiro', count: 17 },
    { label: 'Balanço', count: 20 },
    { label: 'PDV fora da carteira do promotor', count: 25 },
  ]

  switch (period) {
    case 'd-1':
      return {
        chart_data: baseChart,
        total: baseTotal - 10,
        details: baseDetails,
      }
    case 'week':
      return {
        chart_data: {
          ...baseChart,
          series: [
            { ...(baseChart.series?.[0] as never), data: [55] },
            { ...(baseChart.series?.[1] as never), data: [45] },
          ],
        },
        total: baseTotal + 30,
        details: baseDetails,
      }
    case 'month':
      return {
        chart_data: {
          ...baseChart,
          series: [
            { ...(baseChart.series?.[0] as never), data: [35] },
            { ...(baseChart.series?.[1] as never), data: [65] },
          ],
        },
        total: baseTotal + 60,
        details: baseDetails,
      }
    case '60-days':
      return {
        chart_data: {
          ...baseChart,
          series: [
            { ...(baseChart.series?.[0] as never), data: [25] },
            { ...(baseChart.series?.[1] as never), data: [75] },
          ],
        },
        total: baseTotal + 90,
        details: baseDetails,
      }
    case 'today':
    default:
      return {
        chart_data: baseChart,
        total: baseTotal,
        details: baseDetails,
      }
  }
}

export const fetchCard16Data = async (
  period: Card16Period,
): Promise<Card16Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard16Data(period)
}

export const fetchCard16DefaultData = async (): Promise<Card16Data> => {
  return fetchCard16Data('today')
}

const mockCard17Data = (period: Card17Period): Card17Data => {
  const baseTotal = 157

  const baseChart: Card17Data['chart_data'] = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
    },
    title: { text: undefined },
    credits: { enabled: false },
    xAxis: {
      categories: [''],
      lineWidth: 0,
      tickWidth: 0,
      labels: { enabled: false },
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 20,
      title: { text: undefined },
      lineWidth: 1,
      lineColor: '#e5e7eb',
      gridLineWidth: 0,
      labels: {
        style: { color: '#6b7280', fontSize: '11px' },
      },
    },
    tooltip: {
      shared: true,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        borderWidth: 0,
        pointWidth: 18,
        borderRadius: 0,
      },
    },
    series: [
      {
        type: 'bar',
        data: [10],
        color: '#e5f2ff',
      },
      {
        type: 'bar',
        data: [10],
        color: '#bfdbfe',
      },
      {
        type: 'bar',
        data: [10],
        color: '#93c5fd',
      },
      {
        type: 'bar',
        data: [10],
        color: '#60a5fa',
      },
      {
        type: 'bar',
        data: [15],
        color: '#3b82f6',
      },
      {
        type: 'bar',
        data: [15],
        color: '#2563eb',
      },
      {
        type: 'bar',
        data: [30],
        color: '#1d4ed8',
      },
    ],
  }

  const baseDetails = [
    { label: 'Atestado Médico', count: 5 },
    { label: 'Afastamento', count: 20 },
    { label: 'Férias', count: 10 },
    { label: 'Desligamento', count: 50 },
    { label: 'Sem equipamento', count: 35 },
    { label: 'Licença Maternidade/Paternidade', count: 17 },
    { label: 'Outros', count: 20 },
  ]

  switch (period) {
    case 'month':
      return {
        chart_data: baseChart,
        total: baseTotal + 20,
        details: baseDetails,
      }
    case '60-days':
      return {
        chart_data: baseChart,
        total: baseTotal + 40,
        details: baseDetails,
      }
    case 'week':
    default:
      return {
        chart_data: baseChart,
        total: baseTotal,
        details: baseDetails,
      }
  }
}

export const fetchCard17Data = async (
  period: Card17Period,
): Promise<Card17Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard17Data(period)
}

export const fetchCard17DefaultData = async (): Promise<Card17Data> => {
  return fetchCard17Data('week')
}

const mockCard18Data = (): Card18Data => ({
  month: 'Janeiro',
  total: 300,
  new: 30,
  viewed: 270,
})

export const fetchCard18Data = async (): Promise<Card18Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard18Data()
}

const mockCard19Data = (): Card19Data => ({
  occurrences: 18,
})

export const fetchCard19Data = async (): Promise<Card19Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard19Data()
}

const mockCard20Data = (): Card20Data => ({
  check_in: 244,
  check_in_percentage: 33.1,
  check_out: 98,
  check_out_percentage: 10.7,
})

export const fetchCard20Data = async (): Promise<Card20Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard20Data()
}

const mockCard21Data = (): Card21Data => ({
  android: 445,
  ios: 126,
  outdated_apps: 100,
})

export const fetchCard21Data = async (): Promise<Card21Data> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockCard21Data()
}

export const fetchCardData = async (cardId: string): Promise<CardData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    id: cardId,
    title: `Card ${cardId}`,
    content: `Dados mockados para o card ${cardId}`,
  }
}
