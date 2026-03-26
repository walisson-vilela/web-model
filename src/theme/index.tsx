import { useMemo } from 'react'

import { ThemeProvider as Provider, css } from 'styled-components'

import { assetUrl } from '../assets/helpers'
import components from '../components/theme'

import { colors, fonts, opacities, spacings, typographies } from './constants'
import Globals from './globals'
import type {
  ColorOptions,
  OpacitiyOptions,
  ThemeInterface,
} from './interfaces'

const getColor = (
  color: ColorOptions,
  opacity: OpacitiyOptions = 100,
): string => `${colors[color]}${opacities[opacity]}`

const useTypography: ThemeInterface['useTypography'] = (
  typography,
  options = {},
) => {
  const { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } =
    typographies[typography]

  return css`
    font-family: ${fonts[fontFamily]};
    font-size: ${fontSize};
    font-weight: ${options.fontWeight || fontWeight};
    line-height: ${options.lineHeight || lineHeight};
    letter-spacing: ${options.letterSpacing || letterSpacing};
  `
}

const isDarkColor = (
  color: ColorOptions,
  ifDark: ColorOptions = 'white',
  ifLight: ColorOptions = 'black',
): ColorOptions => {
  const hex = colors[color].replace('#', '')

  const red = parseInt(hex.substring(0, 2), 16)
  const green = parseInt(hex.substring(2, 4), 16)
  const blue = parseInt(hex.substring(4, 6), 16)

  const luminosity = (red * 299 + green * 587 + blue * 114) / 1000

  return luminosity <= 128 ? ifDark : ifLight
}

export const theme: Omit<ThemeInterface, 'assetUrl' | 'useFont'> = {
  colors,
  fonts,
  spacings,
  typographies,
  getColor,
  useTypography,
  isDarkColor,
  components,
}

const ThemeProvider = (
  props: React.PropsWithChildren<{
    assetBaseUrl: string
  }>,
) => {
  const value = useMemo((): ThemeInterface => {
    return {
      ...theme,
      assetUrl: (asset) => assetUrl(asset, props.assetBaseUrl),
    }
  }, [props.assetBaseUrl])

  return (
    <Provider theme={value}>
      <Globals />
      {props.children}
    </Provider>
  )
}

export default ThemeProvider
