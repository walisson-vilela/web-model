type TabsNames = 'Canal' | 'Tipologia'

export const getLabel: {
  [name in TabsNames]: {
    name: string
    payloadName: string
    endPointReturnName: string
  }
} = {
  Canal: {
    name: 'Segments',
    endPointReturnName: 'segments',
    payloadName: 'segment_id',
  },
  Tipologia: {
    name: 'Typologies',
    endPointReturnName: 'typologies',
    payloadName: 'typology_id',
  },
}
