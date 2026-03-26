const Mock = [
  {
    title: 'Tarefas (15) Realizado (85,2%) Alcance (98,2%)',
    cards: [
      {
        title: 'CAMPANHA MAIO E JUNHO FORNO DE MINAS',
        color: '#66BB6A',
        validity: {
          start: '2021-01-01',
          end: '2021-06-31',
          duration: 180, // dias
          type: 'Iniciada', // iniciada, nao iniciada, encerrada
        },
        chart: {
          range: [0, 20, 40, 60, 80, 100],
          data: [
            {
              label: 'A',
              value: 90,
              color: '#8E9FCF',
            },
            {
              label: 'S 0',
              value: 85,
              color: '#8E66BB',
            },
            {
              label: 'S-1',
              value: 50,
              color: '#2D9AFF',
            },
          ],
          percentage: {
            label: 'Semana (S0)',
            value: 85,
          },
        },
        required: true,
        behavior: 'Unificar',
        form_count: 10,
        active: true,
        frequency: 'Semanal',
        weekdays: {
          sun: true,
          mon: true,
          tue: true,
          wed: true,
          thu: true,
          fry: true,
          sat: true,
        },
        impact: {
          stores: 500,
          regions: 15,
          users: 180,
          categories: 5,
          skus: 10,
        },
      },

      {
        title: 'CAMPANHA MAIO E JUNHO FORNO DE MINAS',
        color: '#66BB6A',
        validity: {
          start: '2021-01-01',
          end: '2021-01-31',
          duration: 30, // dias
          type: 'Encerrada', // iniciada, nao iniciada, encerrada
        },
        chart: {
          range: [0, 20, 40, 60, 80, 100],
          data: [
            {
              label: 'A',
              value: 0,
              color: '#8E9FCF',
            },
            {
              label: 'S 0',
              value: 0,
              color: '#8E66BB',
            },
            {
              label: 'S-1',
              value: 0,
              color: '#2D9AFF',
            },
          ],
          percentage: {
            label: 'Performance Consolidada',
            value: 97.1,
          },
        },
        required: true,
        behavior: 'Unificar',
        form_count: 10,
        active: true,
        frequency: 'Semanal',
        weekdays: {
          sun: false,
          mon: true,
          tue: false,
          wed: true,
          thu: false,
          fry: true,
          sat: false,
        },
        impact: {
          stores: 500,
          regions: 15,
          users: 180,
          categories: 5,
          skus: 10,
        },
      },

      {
        title: 'CAMPANHA MAIO E JUNHO FORNO DE MINAS',
        color: '#4D6DBE',
        validity: {
          start: '2021-01-01',
          end: '2021-06-31',
          duration: 180, // dias
          type: 'Não Iniciada', // iniciada, nao iniciada, encerrada
        },
        chart: {
          range: [0, 20, 40, 60, 80, 100],
          data: [
            {
              label: 'A',
              value: 100,
              color: '#8E9FCF',
            },
            {
              label: 'D 0',
              value: 0,
              color: '#8E66BB',
            },
            {
              label: 'D-1',
              value: 0,
              color: '#2D9AFF',
            },
          ],
          percentage: {
            label: 'Semana (S0)',
            value: 0,
          },
        },
        required: true,
        behavior: 'Unificar',
        form_count: 10,
        active: true,
        frequency: 'Diária',
        weekdays: null,
        impact: {
          stores: 500,
          regions: 15,
          users: 180,
          categories: 5,
          skus: 10,
        },
      },

      {
        title: 'CAMPANHA MAIO E JUNHO FORNO DE MINAS',
        color: '#66BB6A',
        validity: {
          start: '2021-01-01',
          end: '2021-06-31',
          duration: 180, // dias
          type: 'Iniciada', // iniciada, nao iniciada, encerrada
        },
        chart: {
          range: [0, 20, 40, 60, 80, 100],
          data: [
            {
              label: 'A',
              value: 90,
              color: '#8E9FCF',
            },
            {
              label: 'S 0',
              value: 85,
              color: '#8E66BB',
            },
            {
              label: 'S-1',
              value: 50,
              color: '#2D9AFF',
            },
          ],
          percentage: {
            label: 'Semana (S0)',
            value: 85,
          },
        },
        required: true,
        behavior: 'Unificar',
        form_count: 10,
        active: true,
        frequency: 'Semanal',
        weekdays: {
          sun: true,
          mon: true,
          tue: true,
          wed: true,
          thu: true,
          fry: true,
          sat: true,
        },
        impact: {
          stores: 500,
          regions: 15,
          users: 180,
          categories: 5,
          skus: 10,
        },
      },

      {
        title: 'CAMPANHA MAIO E JUNHO FORNO DE MINAS',
        color: '#66BB6A',
        validity: {
          start: '2021-01-01',
          end: '2021-01-31',
          duration: 30, // dias
          type: 'Encerrada', // iniciada, nao iniciada, encerrada
        },
        chart: {
          range: [0, 20, 40, 60, 80, 100],
          data: [
            {
              label: 'A',
              value: 0,
              color: '#8E9FCF',
            },
            {
              label: 'S 0',
              value: 0,
              color: '#8E66BB',
            },
            {
              label: 'S-1',
              value: 0,
              color: '#2D9AFF',
            },
          ],
          percentage: {
            label: 'Performance Consolidada',
            value: 97.1,
          },
        },
        required: true,
        behavior: 'Unificar',
        form_count: 10,
        active: true,
        frequency: 'Semanal',
        weekdays: {
          sun: false,
          mon: true,
          tue: false,
          wed: true,
          thu: false,
          fry: true,
          sat: false,
        },
        impact: {
          stores: 500,
          regions: 15,
          users: 180,
          categories: 5,
          skus: 10,
        },
      },

      {
        title: 'CAMPANHA MAIO E JUNHO FORNO DE MINAS',
        color: '#4D6DBE',
        validity: {
          start: '2021-01-01',
          end: '2021-06-31',
          duration: 180, // dias
          type: 'Não Iniciada', // iniciada, nao iniciada, encerrada
        },
        chart: {
          range: [0, 20, 40, 60, 80, 100],
          data: [
            {
              label: 'A',
              value: 100,
              color: '#8E9FCF',
            },
            {
              label: 'D 0',
              value: 0,
              color: '#8E66BB',
            },
            {
              label: 'D-1',
              value: 0,
              color: '#2D9AFF',
            },
          ],
          percentage: {
            label: 'Semana (S0)',
            value: 0,
          },
        },
        required: true,
        behavior: 'Unificar',
        form_count: 10,
        active: true,
        frequency: 'Diária',
        weekdays: null,
        impact: {
          stores: 500,
          regions: 15,
          users: 180,
          categories: 5,
          skus: 10,
        },
      },
    ],
  },
]

export default Mock
