import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import {
  Filter,
  Option,
} from '@mw-kit/mw-ui/dist/components/Filters/Filters/interfaces'

import { classifications } from '../../../../services/options'

const typeOptions: Option[] = [
  {
    label: {
      element: <MwEllipsisContainer children='Inativação' />,
      text: 'Inativação',
    },
    value: 'INACTIVATION',
  },
  /*
  {
    label: {
      element: (
        <MwEllipsisContainer>
          Ativação
          <br />
          Programada
        </MwEllipsisContainer>
      ),
      text: 'Ativação Programada',
    },
    value: 'ACTIVATION',
  },
  */
  /*
  {
    label: {
      element: <MwEllipsisContainer children='Feriado Nacional' />,
      text: 'Feriado Nacional',
    },
    value: 'NATIONAL_HOLIDAY',
  },
  */
  {
    label: {
      element: <MwEllipsisContainer children='Feriado Regional' />,
      text: 'Feriado Regional',
    },
    value: 'REGIONAL_HOLIDAY',
  },
  {
    label: {
      element: <MwEllipsisContainer children='Reunião' />,
      text: 'Reunião',
    },
    value: 'MEETING',
  },
  {
    label: {
      element: <MwEllipsisContainer children='Convenção' />,
      text: 'Convenção',
    },
    value: 'CONVENTION',
  },
  {
    label: {
      element: <MwEllipsisContainer children='Treinamento' />,
      text: 'Treinamento',
    },
    value: 'COACHING',
  },
  /*
  {
    label: {
      element: <MwEllipsisContainer children='Férias Coletivas' />,
      text: 'Férias Coletivas',
    },
    value: 'VACATION',
  },
  */
]

const filters: Filter[] = [
  {
    name: 'type',
    label: 'Tipo',
    options: typeOptions,
  },

  {
    name: 'classification_id',
    label: 'Motivo',
    options: async (value) => (await classifications(value)) as any,
  },
  {
    name: 'origin',
    label: 'Origem',
    options: [
      {
        label: 'Cadastro',
        value: 'user',
      },
      {
        label: 'Calendario',
        value: 'calendar',
      },
    ],
  },
]

export default filters
