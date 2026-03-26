import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Usuário',
    key: 'user',
    sortKey: 'People.name',
    width: 2,
  },
  {
    content: 'Função',
    key: 'role',
    sortKey: 'Role.name',
    width: 2,
  },
  {
    content: 'Data/Hora do Envio',
    key: 'timeSend',
    sortKey: 'created_at',
    width: 4,
  },
  {
    content: 'Data/Hora do Recebimento',
    key: 'timeRecive',
    sortKey: 'mobile_date',
    width: 4,
  },
  {
    content: 'Data/Hora da Última Conexão',
    key: 'timeConection',
    sortKey: 'modified_at',
    width: 4,
  },
]

export default header
