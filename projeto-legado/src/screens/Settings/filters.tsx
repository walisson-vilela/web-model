import { FiltersInterfaces } from '@mw-kit/mw-manager'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Referência',
    name: 'reference_id',
    options: [
      { value: 1, label: 'Cadastro de Usuário' },
      { value: 2, label: 'Configurações Mobile' },
      { value: 3, label: 'Galeria de Imagem' },
      { value: 4, label: 'Login' },
      { value: 5, label: 'Price' },
      { value: 6, label: 'Produto' },
    ],
  },
]

export default filters
