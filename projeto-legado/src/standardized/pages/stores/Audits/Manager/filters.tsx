import { FiltersInterfaces } from '@mw-kit/mw-manager'

import {
  chains,
  cities,
  flags,
  peoples,
  regions,
  segments,
  states,
  stores,
  sublocalities,
} from '../../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Estado',
    name: 'state_id',
    options: states,
  },
  {
    label: 'Cidade',
    name: 'city_id',
    options: cities,
  },
  {
    label: 'Bairro',
    name: 'sublocality_id',
    options: sublocalities,
  },
  {
    label: 'Área de Atuação',
    name: 'region_id',
    options: regions,
  },
  {
    label: 'Canal',
    name: 'segment_id',
    options: segments,
  },
  {
    label: 'Rede',
    name: 'market_chain_id',
    options: chains,
  },
  {
    label: 'Bandeira',
    name: 'market_flag_id',
    options: flags,
  },
  {
    label: 'PDV',
    name: 'store_id',
    options: stores,
  },
  {
    label: 'Usuário',
    name: 'created_by',
    options: peoples,
  },
]

export default filters
