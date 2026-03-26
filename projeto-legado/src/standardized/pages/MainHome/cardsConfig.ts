import type { PlaceholderProps } from '@mw-kit/mw-ui/dist/components/Placeholder/interfaces'

import type { CardConfig } from './cardViewTypes'
import { buildCard1View } from './components/cards/Card1'
import { buildCard2View } from './components/cards/Card2'
import { buildCard3View } from './components/cards/Card3'
import { buildCard4View } from './components/cards/Card4'
import { buildCard5View } from './components/cards/Card5'
import { buildCard6View } from './components/cards/Card6'
import { buildCard7View } from './components/cards/Card7'
import { buildCard8View } from './components/cards/Card8'
import { buildCard9View } from './components/cards/Card9'
import { buildCard10View } from './components/cards/Card10'
import { buildCard11View } from './components/cards/Card11'
import { buildCard12View } from './components/cards/Card12'
import { buildCard13View } from './components/cards/Card13'
import { buildCard14View } from './components/cards/Card14'
import { buildCard15View } from './components/cards/Card15'
import { buildCard16View } from './components/cards/Card16'
import { buildCard17View } from './components/cards/Card17'
import { buildCard18View } from './components/cards/Card18'
import { buildCard19View } from './components/cards/Card19'
import { buildCard20View } from './components/cards/Card20'
import { buildCard21View } from './components/cards/Card21'
import {
  fetchCard1Data,
  fetchCard2Data,
  fetchCard3Data,
  fetchCard4Data,
  fetchCard5Data,
  fetchCard6Data,
  fetchCard7Data,
  fetchCard8Data,
  fetchCard9Data,
  fetchCard10Data,
  fetchCard11Data,
  fetchCard12Data,
  fetchCard13Data,
  fetchCard14Data,
  fetchCard15Data,
  fetchCard16DefaultData,
  fetchCard17DefaultData,
  fetchCard18Data,
  fetchCard19Data,
  fetchCard20Data,
  fetchCard21Data,
} from './services'

export const CARD_CONFIGS: Record<string, CardConfig> = {
  'card-1': {
    load: fetchCard1Data,
    build: buildCard1View,
    placeholderType: 'template3',
  },
  'card-2': {
    load: fetchCard2Data,
    build: buildCard2View,
    placeholderType: 'template2',
  },
  'card-3': {
    load: fetchCard3Data,
    build: buildCard3View,
    placeholderType: 'template2',
  },
  'card-4': {
    load: fetchCard4Data,
    build: buildCard4View,
    placeholderType: 'template3',
  },
  'card-5': {
    load: fetchCard5Data,
    build: buildCard5View,
    placeholderType: 'template2',
  },
  'card-6': {
    load: fetchCard6Data,
    build: buildCard6View,
    placeholderType: 'template2',
  },
  'card-7': {
    load: fetchCard7Data,
    build: buildCard7View,
    placeholderType: 'template3',
  },
  'card-8': {
    load: fetchCard8Data,
    build: buildCard8View,
    placeholderType: 'template3',
  },
  'card-9': {
    load: fetchCard9Data,
    build: buildCard9View,
    placeholderType: 'template2',
  },
  'card-10': {
    load: fetchCard10Data,
    build: buildCard10View,
    placeholderType: 'template2',
  },
  'card-11': {
    load: fetchCard11Data,
    build: buildCard11View,
    placeholderType: 'template2',
  },
  'card-12': {
    load: fetchCard12Data,
    build: buildCard12View,
    placeholderType: 'template3',
  },
  'card-13': {
    load: fetchCard13Data,
    build: buildCard13View,
    placeholderType: 'template3',
  },
  'card-14': {
    load: fetchCard14Data,
    build: buildCard14View,
    placeholderType: 'template2',
  },
  'card-15': {
    load: fetchCard15Data,
    build: buildCard15View,
    placeholderType: 'template2',
  },
  'card-16': {
    load: fetchCard16DefaultData,
    build: buildCard16View,
    placeholderType: 'template3',
  },
  'card-17': {
    load: fetchCard17DefaultData,
    build: buildCard17View,
    placeholderType: 'template3',
  },
  'card-18': {
    load: fetchCard18Data,
    build: buildCard18View,
    placeholderType: 'template2',
  },
  'card-19': {
    load: fetchCard19Data,
    build: buildCard19View,
    placeholderType: 'template2',
  },
  'card-20': {
    load: fetchCard20Data,
    build: buildCard20View,
    placeholderType: 'template2',
  },
  'card-21': {
    load: fetchCard21Data,
    build: buildCard21View,
    placeholderType: 'template2',
  },
}

export const DEFAULT_PLACEHOLDER_TYPE: PlaceholderProps['type'] = 'template1'
