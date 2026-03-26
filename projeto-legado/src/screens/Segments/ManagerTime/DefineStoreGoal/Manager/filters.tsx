import { FiltersInterfaces } from '@mw-kit/mw-manager'

import {
  flags as getFlagsOptions,
  typologies as getTypologiesOptions,
} from '../../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Bandeira',
    name: 'market_flag_id',
    options: getFlagsOptions,
  },
  {
    label: 'Tipologia',
    name: 'typology_id',
    options: getTypologiesOptions,
  },
  {
    label: 'Classificação',
    name: 'classification',
    options: [
      { label: 'Classe A', value: 'Classe A' },
      { label: 'Classe B', value: 'Classe B' },
      { label: 'Classe C', value: 'Classe C' },
      { label: 'Premium', value: 'Premium' },
      { label: 'Auto Giro', value: 'Auto Giro' },
    ],
  },
  {
    label: 'N° Checkout',
    name: 'checkout',
    options: [
      { label: '1 a 4', value: '1 a 4' },
      { label: '5 a 9', value: '5 a 9' },
      { label: '10 a 19', value: '10 a 19' },
      { label: 'Acima de 20', value: 'Acima de 20' },
    ],
  },
]

export default filters
