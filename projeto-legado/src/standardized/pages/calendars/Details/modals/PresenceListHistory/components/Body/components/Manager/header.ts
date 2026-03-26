import type { ColumnInterface } from '@mw-kit/mw-manager'

import type { Card } from '../../../../../../components/types'

const header = (card: Card) => {
  switch (card.type) {
    case 'REGIONAL_HOLIDAY':
      return [
        {
          content: 'Nome',
          key: 'name',
          textAlign: 'left',
          width: 10,
          sortKey: 'name',
        },
        {
          content: 'Matrícula',
          key: 'registration',
          textAlign: 'left',
          width: 2,
          sortKey: 'registration',
        },
        {
          content: 'Função',
          key: 'role',
          textAlign: 'left',
          width: 2,
          sortKey: 'Roles.name',
        },
        {
          content: 'Pilares',
          key: 'team',
          textAlign: 'center',
          width: 2,
          sortKey: 'hierarchy_count',
        },
      ] satisfies ColumnInterface[]
    default:
      return [
        {
          content: 'Nome',
          key: 'name',
          textAlign: 'left',
          width: 3,
          sortKey: 'name',
        },
        {
          content: 'Matrícula',
          key: 'registration',
          textAlign: 'left',
          width: 2,
          sortKey: 'registration',
        },
        {
          content: 'Função',
          key: 'role',
          textAlign: 'left',
          width: 2,
          sortKey: 'Roles.name',
        },
        {
          content: 'Pilares',
          key: 'team',
          textAlign: 'center',
          width: 2,
          sortKey: 'hierarchy_count',
        },

        {
          content: 'Check-In',
          key: 'check_in_jsx',
          textAlign: 'left',
          width: 2,
          sortKey: 'check_in',
        },
        {
          content: 'Check-Out',
          key: 'check_out_jsx',
          textAlign: 'left',
          width: 2,
          sortKey: 'check_out',
        },
        {
          content: 'Monitoramento GPS',
          key: 'gps_jsx',
          textAlign: 'center',
          width: 3,
          sortKey: 'gps',
          ellipsis: false,
        },
      ] satisfies ColumnInterface[]
  }
}

export default header
