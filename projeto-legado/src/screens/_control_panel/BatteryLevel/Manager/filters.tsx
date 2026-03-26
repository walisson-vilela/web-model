import { FiltersInterfaces } from '@mw-kit/mw-manager'

import { roles as getRolesOptions } from '../../../../services/options'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Função',
    name: 'role_id',
    options: getRolesOptions,
  },
  {
    label: '1° Bateria',
    name: '', // ???
    options: [
      { label: '0 a 60', value: 1 },
      { label: '61 a 80', value: 2 },
      { label: '81 a 100', value: 3 },
    ],
  },
  {
    label: 'Bateria Atual',
    name: '', // ???
    options: [
      { label: '0 a 60', value: 1 },
      { label: '61 a 80', value: 2 },
      { label: '81 a 100', value: 3 },
    ],
  },
  {
    label: 'Média Consumo',
    name: '', // ???
    options: [
      { label: 'Abaixo de 10', value: 1 },
      { label: 'Acima de 10', value: 2 },
    ],
  },
  {
    label: 'Nível Atividade',
    name: '', //???
    options: [
      { label: 'Alta', value: 1 },
      { label: 'Moderada', value: 2 },
      { label: 'Baixa', value: 3 },
      { label: 'Sem Informação', value: 0 },
    ],
  },
]

export default filters
