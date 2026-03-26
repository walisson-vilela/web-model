import React from 'react'

import { filterObject } from '../../functions/formatters'
import { isKeyOf } from '../../functions/validators'
import { colors } from '../../theme/constants'
import { featherIcons } from '../../assets/icons/feather'

import type { CommonProps, ExtendsCommon, IconProps } from './interfaces'
import * as S from './styled'

const getColor = (c?: string): string => {
  if (!c) return colors.grey

  return isKeyOf(colors, c) ? colors[c] : c
}

const getCommonProps = (props: ExtendsCommon) => {
  const color = getColor(props.color as string)
  const commonProps = filterObject<typeof props, Omit<CommonProps, 'color'>>(
    props,
    ['type', 'icon', 'color'],
    {
      width: '16px',
      height: '16px',
    },
  )

  return { color, commonProps }
}

const Icon = (props: IconProps) => {
  switch (props.type) {
    case 'feather': {
      const { color, commonProps } = getCommonProps(props)
      const Component = featherIcons[props.icon] || featherIcons.info
      return (
        <S.SVGContainer
          $color={color}
          $strokeWidth={props.strokeWidth}
          $pointer={!!props.onClick}
        >
          <Component {...commonProps} />
        </S.SVGContainer>
      )
    }
    case 'svg': {
      const { color, commonProps } = getCommonProps(props)

      const Component = props.icon
      return (
        <S.SVGContainer
          $color={color}
          $strokeWidth={props.strokeWidth}
          $pointer={!!props.onClick}
        >
          <Component {...commonProps} />
        </S.SVGContainer>
      )
    }
    case 'jsx': {
      return props.icon
    }
    default:
      throw new Error('Invalid icon type')
  }
}

export default Icon
