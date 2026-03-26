import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../components/Bullet'
import {
  brands,
  categories,
  chains,
  cities,
  flags,
  forms,
  groups,
  peoples,
  productLine,
  productsOptions,
  regions,
  roles,
  segments,
  states,
  stores,
  subCategories,
  sublocalities,
  suppliers,
  teams,
  typologies,
} from '../../../services/options'
import { filterStatus } from '../manager/label'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: Object.keys(filterStatus).map((key) => {
      const { name, color } = filterStatus[key]
      const option: FiltersInterfaces.Option = {
        label: <Bullet content={name} color={color} />,
        value: key,
      }

      return option
    }),
  },
  {
    label: 'Formulário',
    name: 'form_id',
    options: forms,
  },
  {
    label: 'Área de Atuação',
    name: 'region_id',
    options: regions,
  },
  {
    label: 'Estado',
    name: 'state_id',
    options: states,
  },
  {
    label: 'Cidade',
    name: 'city_id',
    options: cities,
  },
  {
    label: 'Bairro',
    name: 'sublocality_id',
    options: sublocalities,
  },
  {
    label: 'Canal',
    name: 'segment_id',
    options: segments,
  },
  {
    label: 'Tipologia',
    name: 'typology_id',
    options: typologies,
  },
  {
    label: 'PDV',
    name: 'store_id',
    options: stores,
  },
  {
    label: 'Grupo',
    name: 'market_id',
    options: groups,
  },
  {
    label: 'Rede',
    name: 'market_chain_id',
    options: chains,
  },
  {
    label: 'Bandeira',
    name: 'market_flag_id',
    options: flags,
  },
  {
    label: 'Produto',
    name: 'product_id',
    options: productsOptions,
  },
  {
    label: 'Fabricante',
    name: 'supplier_id',
    options: suppliers,
  },
  {
    label: 'Marca',
    name: 'brand_id',
    options: brands,
  },
  {
    label: 'Categoria',
    name: 'category_id',
    options: categories,
  },
  {
    label: 'Sub-Categoria',
    name: 'subcategory_id',
    options: subCategories,
  },
  {
    label: 'Linha de Produto',
    name: 'product_line_id',
    options: productLine,
  },
  {
    label: 'Usuário',
    name: 'people_id',
    options: peoples,
  },
  {
    label: 'Função',
    name: 'role_id',
    options: roles,
  },
  {
    label: 'Equipe',
    name: 'hierarchy_element_id',
    options: teams,
  },
]
export default filters
