import React from 'react'

import { MwEllipsisContainer, MwIcon } from '@mw-kit/mw-ui'

import { SourceStatus } from '../../../types'

import { checkValues } from './interface'
import * as S from './styled'

type ICheckAddress = React.PropsWithChildren<{
  status: SourceStatus
  right?: true
  inverted?: boolean
}>

const CheckAddress = ({ status, children, right, inverted }: ICheckAddress) => {
  return (
    <S.ContainerCheckAddress
      $colorValue={checkValues[status || 'EMPTY'].color}
      $right={right}
    >
      <MwIcon
        color={inverted ? 'darkBlue' : 'white'}
        height='10px'
        width='10px'
        type='feather'
        icon='check'
        strokeWidth='3px'
      />

      <MwEllipsisContainer>{children}</MwEllipsisContainer>
    </S.ContainerCheckAddress>
  )
}
export default CheckAddress
