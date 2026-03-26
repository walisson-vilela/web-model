import { ColumnInterface } from '@mw-kit/mw-manager/dist/components/Manager/interfaces'

const header: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 2,
    type: 'numeric',
    sortKey: 'id',
  },
  {
    content: 'Nome',
    key: 'name',
    textAlign: 'left',
    width: 4,
    sortKey: 'name',
  },
  {
    content: "EPI's Recebidos",
    key: 'episReceivedFormatted',
    textAlign: 'center',
    width: 2,
    type: 'numeric',
    sortKey: 'episReceived',
  },
  {
    content: 'Vencendo em 90 dias',
    key: 'expiring90Formatted',
    textAlign: 'center',
    width: 2,
    type: 'numeric',
    sortKey: 'expiring90',
  },
  {
    content: 'Vencendo em 60 dias',
    key: 'expiring60Formatted',
    textAlign: 'center',
    width: 2,
    type: 'numeric',
    sortKey: 'expiring60',
  },
  {
    content: 'Vencendo em 30 dias',
    key: 'expiring30Formatted',
    textAlign: 'center',
    width: 2,
    type: 'numeric',
    sortKey: 'expiring30',
  },
  {
    content: 'Vencidos',
    key: 'expiredFormatted',
    textAlign: 'center',
    width: 2,
    type: 'numeric',
    sortKey: 'expired',
  },
]

export default header
