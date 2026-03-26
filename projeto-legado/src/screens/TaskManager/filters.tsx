import { FiltersInterfaces } from '@mw-kit/mw-manager'

import {
  categories as getCategoriesOptions,
  roles as getRolesOptions,
} from '../../services/options'

export const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'active',
    options: [
      { label: 'Ativo', value: true },
      { label: 'Inativo', value: false },
    ],
  },
  {
    label: 'Frequência',
    name: 'frequency',
    options: [
      { label: 'Diária', value: 'Diária' },
      { label: 'Semanal', value: 'Semanal' },
      { label: 'Quinzenal', value: 'Quinzenal' },
      { label: 'Mensal', value: 'Mensal' },
      { label: 'Única Vez', value: 'Única Vez' },
      { label: 'Repetição', value: 'Repetição' },
    ],
  },
  {
    label: 'Vigência',
    name: 'validity',
    options: [
      { label: 'Iniciada', value: 'Iniciada' },
      { label: 'Não Iniciada', value: 'Não Iniciada' },
      { label: 'Encerrada', value: 'Encerrada' },
    ],
  },
  {
    label: 'Linha de Produto',
    name: 'category_id',
    options: getCategoriesOptions,
  },
  {
    label: 'Função',
    name: 'role_id',
    options: getRolesOptions,
  },
]

export const sorts: FiltersInterfaces.Option[] = [
  {
    label: 'Melhor Performance',
    value: 'Melhor Performance',
  },
  {
    label: 'Pior Performance',
    value: 'Pior Performance',
  },
  {
    label: 'Frequência Execução',
    value: 'Frequência Execução',
  },
]
