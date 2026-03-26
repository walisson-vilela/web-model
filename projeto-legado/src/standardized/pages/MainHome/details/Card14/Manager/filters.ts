import { FiltersInterfaces } from '@mw-kit/mw-manager'
import {
    categories as getCategoriesOptions,
    productLine as getProductLineOptions,
    productsOptions as getProductsOptions,
    roles as getRolesOptions,
    subCategories as getSubCategoriesOptions
} from '../../../../../../services/options'

const requireSearch = (value: unknown) =>
  typeof value === 'string' && value.trim().length > 0

const rolesOptions: FiltersInterfaces.OptionsCallback = async (value, page) => {
  if (!requireSearch(value)) return Promise.resolve([])
  return getRolesOptions(value, page)
}

const categoriesOptions: FiltersInterfaces.OptionsCallback = async (value, page) => {
  if (!requireSearch(value)) return Promise.resolve([])
  return getCategoriesOptions(value, page ?? 1)
}

const subCategoriesOptions: FiltersInterfaces.OptionsCallback = async (value, page) => {
  if (!requireSearch(value)) return Promise.resolve([])
  return getSubCategoriesOptions(value, page ?? 1)
}

const productLineOptions: FiltersInterfaces.OptionsCallback = async (value, page) => {
  if (!requireSearch(value)) return Promise.resolve([])
  return getProductLineOptions(value, page ?? 1)
}

const productsOptions: FiltersInterfaces.OptionsCallback = async (value, page) => {
  if (!requireSearch(value)) return Promise.resolve([])
  return getProductsOptions(value, page ?? 1)
}

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: [
      {
        label: 'Ativo',
        value: 'active',
      },
      {
        label: 'Inativo',
        value: 'inactive',
      },
    ],
  },
  {
    label: 'Função',
    name: 'role_id',
    options: rolesOptions,
  },
  {
    label: 'Frequência',
    name: 'frequency',
    options: [
      { label: 'Diária', value: 'daily' },
      { label: 'Semanal', value: 'weekly' },
      { label: 'Quinzenal', value: 'biweekly' },
      { label: 'Mensal', value: 'monthly' },
      { label: 'Única Vez', value: 'one_time' },
      { label: 'Repetição', value: 'recurring' },
    ],
  },
  {
    label: 'Vigência',
    name: 'validity',
    options: [
      { label: 'Iniciada', value: 'started' },
      { label: 'Não iniciada', value: 'not_started' },
      { label: 'Concluída', value: 'completed' },
      { label: 'Interrompida', value: 'interrupted' },
    ],
  },
  {
    label: 'Categoria',
    name: 'category_id',
    options: categoriesOptions,
  },
  {
    label: 'Sub-Categoria',
    name: 'sub_category_id',
    options: subCategoriesOptions,
  },
  {
    label: 'Linha Produto',
    name: 'product_line_id',
    options: productLineOptions,
  },
  {
    label: 'Produto',
    name: 'product_id',
    options: productsOptions,
  },
]

export default filters
