import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../components/Bullet'
import {
  cities as getCitiesOptions,
  states as getStatesOptions,
  stores as getStoresOptions,
  sublocalities as getSublocalitiesOptions,
  peoples as getUsersOptions,
} from '../../../services/options'

import { genericStatus, status as statusLabels } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: Object.keys(statusLabels)
      .reverse()
      .map((key) => {
        const { name, color } = statusLabels[key]

        const option: FiltersInterfaces.Option = {
          label: <Bullet content={name} color={color} />,
          value: key,
        }

        return option
      }),
  },
  {
    label: 'Usuários',
    name: 'user_id',
    options: getUsersOptions,
  },
  {
    label: 'PDV',
    name: 'store_id',
    options: getStoresOptions,
  },
  {
    label: 'Estado',
    name: 'state_id',
    options: getStatesOptions,
  },
  {
    label: 'Cidade',
    name: 'city_id',
    options: getCitiesOptions,
  },
  {
    label: 'Bairro',
    name: 'sublocality_id',
    options: getSublocalitiesOptions,
  },
  {
    label: 'Particularidade',
    name: 'has_particularities',
    options: Object.keys(genericStatus)
      .reverse()
      .map((key) => {
        const { name, color } = genericStatus[key]

        const option: FiltersInterfaces.Option = {
          label: <Bullet content={name} color={color} />,
          value: key,
        }

        return option
      }),
  },
  {
    label: 'Roteiro',
    name: 'has_routes',
    options: Object.keys(genericStatus)
      .reverse()
      .map((key) => {
        const { name, color } = genericStatus[key]

        const option: FiltersInterfaces.Option = {
          label: <Bullet content={name} color={color} />,
          value: key,
        }

        return option
      }),
  },
]

export default filters
