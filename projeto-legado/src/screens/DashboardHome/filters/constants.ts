import type {
  FilterKey,
  FilterLabelKey,
  FilterOption,
  FilterOrderKey,
  FilterState,
  Level,
  LevelElement,
  Area,
} from './types'

export const FILTER_STORAGE_KEY = 'dashboardHome.filters'

export const FILTER_LABELS: Record<FilterLabelKey, string> = {
  vision: 'Visão',
  level: 'Nível',
  area: 'Área',
}

export const FILTER_ORDER: FilterOrderKey[] = ['vision', 'level', 'area']

export const FILTER_OPTIONS: Record<'vision', FilterOption[]> = {
  vision: [
    { value: 1, label: 'Trade' },
    { value: 2, label: 'Comercial' },
    { value: 3, label: 'Marketing' },
  ],
}

export const FILTER_DEFAULT_STATE: FilterState = {
  vision: 1,
  levelId: 101,
  levelElementId: 0,
  areasIds: [],
  date: new Date().toISOString().split('T')[0],
}

export const LEVELS: Level[] = [
  { id: 101, name: 'Diretoria' },
  { id: 102, name: 'Gerência Regional' },
  { id: 103, name: 'Supervisão' },
  { id: 104, name: 'Equipe de Campo' },
]

export const LEVEL_ELEMENTS: LevelElement[] = [
  { id: 1001, levelId: 101, name: 'Brasil' },
  { id: 1002, levelId: 101, name: 'LatAm' },
  { id: 2001, levelId: 102, name: 'Sul' },
  { id: 2002, levelId: 102, name: 'Sudeste' },
  { id: 2003, levelId: 102, name: 'Centro-Oeste' },
  { id: 2004, levelId: 102, name: 'Nordeste' },
  { id: 2005, levelId: 102, name: 'Norte' },
  { id: 3001, levelId: 103, name: 'Segmento Alimentar' },
  { id: 3002, levelId: 103, name: 'Segmento Farma' },
  { id: 3003, levelId: 103, name: 'Segmento Varejo' },
  { id: 4001, levelId: 104, name: 'Equipe Alfa' },
  { id: 4002, levelId: 104, name: 'Equipe Beta' },
  { id: 4003, levelId: 104, name: 'Equipe Gama' },
  { id: 4004, levelId: 104, name: 'Equipe Delta' },
]

export const AREAS: Area[] = [
  { id: 5001, name: 'Sul' },
  { id: 5002, name: 'Sudeste' },
  { id: 5003, name: 'Centro-Oeste' },
  { id: 5004, name: 'Nordeste' },
  { id: 5005, name: 'Norte' },
  { id: 5006, name: 'Key Accounts' },
  { id: 5007, name: 'Cash & Carry' },
  { id: 5008, name: 'Proximidade' },
  { id: 5009, name: 'Farmácias' },
  { id: 5010, name: 'Supermercados' },
]
