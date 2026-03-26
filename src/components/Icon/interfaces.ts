import type React from 'react'

import type { FeatherIconName } from '../../assets/icons/feather'
import type { colors } from '../../theme/constants'

export interface CommonProps {
  color?: typeof colors | string
  width?: string | number
  height?: string | number
}

export interface FeatherIcon extends CommonProps {
  type: 'feather'
  icon: FeatherIconName
  onClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
  strokeWidth?: string
}

export interface SVGIcon extends CommonProps {
  type: 'svg'
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  onClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
  strokeWidth?: string
}

export interface JSXIcon {
  color?: typeof colors | string
  type: 'jsx'
  icon: JSX.Element
  width: string | number
}

export type ExtendsCommon = FeatherIcon | SVGIcon

export type IconProps = FeatherIcon | SVGIcon | JSXIcon
