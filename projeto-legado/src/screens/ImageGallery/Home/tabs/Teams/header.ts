import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Matrícula',
    key: 'people_re',
    textAlign: 'left',
    width: 1,
    sortKey: 'Peoples.re',
  },
  {
    content: 'Pessoa',
    key: 'people_name_jsx',
    textAlign: 'left',
    width: 4,
    sortKey: 'Peoples.name',
  },
  {
    content: 'Função',
    key: 'role_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'Roles.name',
  },
  {
    content: 'Marcas',
    key: 'brand_count_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'brand_count',
  },
  {
    content: 'Imagens',
    key: 'image_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'image_count',
  },
  {
    content: 'Aprovadas',
    key: 'approved_image_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'approved_image_count',
  },
  {
    content: 'Reprovadas',
    key: 'disapproved_image_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'disapproved_image_count',
  },
]

export default header
