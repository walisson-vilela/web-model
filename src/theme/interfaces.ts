import type { RuleSet } from 'styled-components'

import type components from '../components/theme'

import type {
  colors,
  fonts,
  opacities,
  spacings,
  typographies,
} from './constants'

export type ColorOptions = keyof typeof colors
export type OpacitiyOptions = keyof typeof opacities
export type SpacingOptions = keyof typeof spacings
export type FontOptions = keyof typeof fonts

type FontWeight =
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

interface Typography {
  fontFamily: FontOptions
  fontWeight: FontWeight
  fontSize: string
  lineHeight: string
  letterSpacing: string
}

type TypographyOptions = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'

export type Typographies = {
  [key in TypographyOptions]: Typography
}

export interface ThemeInterface {
  colors: typeof colors
  fonts: typeof fonts
  getColor: (color: ColorOptions, opacity?: OpacitiyOptions) => string
  useTypography: (
    typography: TypographyOptions,
    options?: Partial<
      Pick<Typography, 'fontWeight' | 'lineHeight' | 'letterSpacing'>
    >,
  ) => RuleSet
  isDarkColor: (
    color: ColorOptions,
    ifDark?: ColorOptions,
    ifLight?: ColorOptions,
  ) => ColorOptions
  spacings: typeof spacings
  typographies: typeof typographies
  components: typeof components
  assetUrl: (asset: string) => string
}
