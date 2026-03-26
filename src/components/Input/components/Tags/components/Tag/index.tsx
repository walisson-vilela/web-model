import React from 'react'

import Icon from '../../../../../Icon'

import type { TagProps } from './interfaces'
import * as S from './styles'

const Tag = ({ invalid, onClose, ...props }: TagProps) => {
  return (
    <S.Tag {...props} $invalid={invalid}>
      {props.children}
      <div onClick={onClose}>
        <Icon
          type='feather'
          icon='x'
          width='10px'
          color={invalid ? 'warningRed' : undefined}
          strokeWidth='3px'
        />
      </div>
    </S.Tag>
  )
}

export default Tag
