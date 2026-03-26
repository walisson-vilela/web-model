import { FiltersInterfaces } from '@mw-kit/mw-manager'

import CheckAddress from '../../../../Home/components/CheckAddress'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'CNPJ',
    name: 'has_document',
    options: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
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
