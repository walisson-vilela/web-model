type TabsNames = 'PDV' | 'Grupo' | 'Rede' | 'Bandeira'

export const getLabel: {
  [name in TabsNames]: {
    name: string
    payloadName: string
    endPointReturnName: string
  }
} = {
  PDV: {
    name: 'Stores',
    endPointReturnName: 'stores',
    payloadName: 'store_id',
  },
  Grupo: {
    name: 'MarketGroups',
    endPointReturnName: 'market_groups',
    payloadName: 'market_id',
  },
  Rede: {
    name: 'MarketChains',
    endPointReturnName: 'market_chains',
    payloadName: 'market_chain_id',
  },
  Bandeira: {
    name: 'MarketFlags',
    endPointReturnName: 'market_flags',
    payloadName: 'market_flag_id',
  },
}
