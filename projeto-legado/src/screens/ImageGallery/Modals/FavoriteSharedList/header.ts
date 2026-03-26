import { ColumnInterface } from '@mw-kit/mw-manager'

export const favoriteSharedListHeader: ColumnInterface[] = [
  {
    content: 'Matrícula',
    key: 're',
    textAlign: 'left',
    width: 4,
    sortKey: 're',
  },
  {
    content: 'Usuários',
    key: 'name',
    textAlign: 'left',
    width: 6,
    sortKey: 'name',
  },
  {
    content: 'Tipo de Compartilhamento',
    key: 'role_text',
    textAlign: 'left',
    width: 6,
    sortKey: 'role_text',
  },
]
