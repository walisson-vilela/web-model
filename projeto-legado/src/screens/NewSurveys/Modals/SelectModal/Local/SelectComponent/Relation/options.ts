type TabsNames = 'Área de Atuação' | 'Estados' | 'Cidade' | 'Bairro'

export const getLabel: {
  [name in TabsNames]: {
    name: string
    payloadName: string
    endPointReturnName: string
  }
} = {
  'Área de Atuação': {
    name: 'Regions',
    payloadName: 'region_id',
    endPointReturnName: 'regions',
  },
  Bairro: {
    name: 'Sublocalities',
    payloadName: 'sublocality_id',
    endPointReturnName: 'sublocalities',
  },
  Cidade: {
    name: 'Cities',
    payloadName: 'city_id',
    endPointReturnName: 'cities',
  },
  Estados: {
    name: 'States',
    payloadName: 'state_id',
    endPointReturnName: 'states',
  },
}
