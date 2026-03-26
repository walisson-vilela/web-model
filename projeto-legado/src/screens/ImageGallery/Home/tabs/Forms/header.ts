import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Código',
    key: 'form_id',
    textAlign: 'left',
    width: 1,
    sortKey: 'Forms.id',
  },
  {
    content: 'Formulário',
    key: 'form_name',
    textAlign: 'left',
    width: 4,
    sortKey: 'Forms.name',
  },
  {
    content: 'Conta',
    key: 'contractor_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'Contractors.name',
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
