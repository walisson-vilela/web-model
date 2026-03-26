type TabsNames =
  | 'Produto'
  | 'Fabricante'
  | 'Marca'
  | 'Categoria'
  | 'Sub-Categoria'
  | 'Linha de Produto'

export const getLabel: {
  [name in TabsNames]: {
    name: string
    endPointReturnName: string
    payloadName: string
  }
} = {
  Produto: {
    name: 'Products',
    endPointReturnName: 'products',
    payloadName: 'product_id',
  },
  Fabricante: {
    name: 'Suppliers',
    endPointReturnName: 'suppliers',
    payloadName: 'supplier_id',
  },
  Marca: {
    name: 'Brands',
    endPointReturnName: 'brands',
    payloadName: 'brand_id',
  },
  Categoria: {
    name: 'Categories',
    endPointReturnName: 'categories',
    payloadName: 'category_id',
  },
  'Sub-Categoria': {
    name: 'SubCategories',
    endPointReturnName: 'sub_categories',
    payloadName: 'subcategory_id',
  },
  'Linha de Produto': {
    name: 'ProductLines',
    endPointReturnName: 'product_lines',
    payloadName: 'product_line_id',
  },
}
