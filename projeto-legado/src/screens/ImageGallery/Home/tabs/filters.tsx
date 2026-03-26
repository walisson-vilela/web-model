import { FiltersInterfaces } from '@mw-kit/mw-manager'

import {
  brands,
  categories,
  chains,
  cities,
  contractors,
  flags,
  forms,
  peoples,
  regions,
  segments,
  states,
  teams,
  typologies,
} from '../../../../services/options'

export const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Conta',
    name: 'contractor_id',
    options: contractors,
  },
  {
    label: 'Executor',
    name: 'people_id',
    options: peoples,
  },
  {
    label: 'Equipes',
    name: 'hierarchy_element_id',
    options: teams,
  },
  {
    label: 'Marca',
    name: 'brand_id',
    options: brands,
  },
  {
    label: 'Categoria',
    name: 'category_id',
    options: categories,
  },
  {
    label: 'Formulário',
    name: 'form_id',
    options: forms,
  },
  /* {
    label: 'Tipo de Campo',
    name: 'field_type',
    options: [
      { label: 'Preço', value: 'Preço' },
      { label: 'Ruptura', value: 'Ruptura' },
    ],
  }, */
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
    label: 'Tipologia',
    name: 'typology_id',
    options: typologies,
  },
  {
    label: 'Área de Atuação',
    name: 'region_id',
    options: regions,
  },
  {
    label: 'Cidade',
    name: 'city_id',
    options: cities,
  },
  {
    label: 'Estado',
    name: 'state_id',
    options: states,
  },
  {
    label: 'N° de Checkout',
    name: 'checkouts',
    options: [
      { label: '1 a 4', value: '1 a 4' },
      { label: '5 a 9', value: '5 a 9' },
      { label: '10 a 19', value: '10 a 19' },
      { label: 'Acima de 20', value: 'Acima de 20' },
    ],
  },
]

export default filters
