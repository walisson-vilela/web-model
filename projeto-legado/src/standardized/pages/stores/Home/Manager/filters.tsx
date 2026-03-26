import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../../components/Bullet'
import {
  classifications as getClassificationsOptions,
  flags as getFlagsOptions,
  segments as getSegmentsOptions,
  typologies as getTypologiesOptions,
} from '../../../../../services/options'
import CheckAddress from '../components/CheckAddress'

import { status as statusLabels } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: Object.keys(statusLabels)
      .reverse()
      .map((key) => {
        const { name, color } = { ...statusLabels[key] }

        const option: FiltersInterfaces.Option = {
          label: <Bullet content={name} color={color} />,
          value: key,
        }

        return option
      }),
  },
  {
    label: 'Auditado',
    name: 'coordinate_status',
    options: [
      { label: 'Sim', value: 1 },
      { label: 'Pend. Executor', value: '' },
      { label: 'Pend. Gestor', value: 0 },
    ],
  },
  {
    label: 'Cobertura',
    name: 'covered',
    options: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },
  {
    label: 'Canal',
    name: 'segment_id',
    options: getSegmentsOptions,
  },
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
    name: 'classification_id',
    options: getClassificationsOptions,
  },
  {
    label: 'N° Checkout',
    name: 'checkouts',
    options: [
      { label: '1 a 4', value: '1,4' },
      { label: '5 a 9', value: '5,9' },
      { label: '10 a 19', value: '10,19' },
      { label: 'Acima de 20', value: '20' },
    ],
  },
  {
    label: 'Selo de Qualificação',
    name: 'source_status',
    options: [
      {
        label: <CheckAddress status='VALID' children='Valido' />,
        value: 'VALID',
      },
      {
        label: <CheckAddress status='UNKNOWN' children='Não Valido' />,
        value: 'UNKNOWN',
      },
      { label: <CheckAddress status={null} children='Sem CNPJ' />, value: '' },
      {
        label: <CheckAddress status='INVALID' children='Inválido' />,
        value: 'INVALID',
      },
      {
        label: (
          <CheckAddress
            status='UPDATED'
            children='Atualizado na Receita Federal'
          />
        ),
        value: 'UPDATED',
      },
    ],
  },
]

export default filters
