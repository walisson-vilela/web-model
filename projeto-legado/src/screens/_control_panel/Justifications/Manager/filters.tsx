import { FiltersInterfaces } from '@mw-kit/mw-manager'

import {
  segments as getSegmentsOptions,
  peoples as getSupervisorOptions,
} from '../../../../services/options'

// TODO: Alterar filtro de Motivos

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Canal',
    name: 'segment_id',
    options: getSegmentsOptions,
  },
  {
    label: 'Supervisor',
    name: 'supervisor_id',
    options: getSupervisorOptions,
  },
  {
    label: 'Motivo',
    name: 'justify_name',
    options: async (
      value: string | number | boolean,
    ): Promise<FiltersInterfaces.Option[]> => {
      console.log(value)

      await fetch('https://pokeapi.co/api/v2/pokemon')

      return [
        { label: 'Motivo 1', value: 1 },
        { label: 'Motivo 2', value: 2 },
      ]
    },
  },
]

export default filters
