import React from 'react'

import { filterObject } from '../../../../functions/formatters'
import EllipsisContainer from '../../../EllipsisContainer'
import { useContext } from '../Row/context'

import type { ColProps } from './interfaces'
import * as S from './styles'

const Col = React.forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const context = useContext()

  const colProps = { ...context.cols, ...props }

  const htmlProps = filterObject<
    ColProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'width'>
  >(colProps, [
    'width',
    'spacing',
    'align',
    'spacingAround',
    'bordered',
    'hover',
    'pointer',
    'ellipsis',
    'backgroundColor',
    'fontColor',
  ])

  return (
    <S.Col
      ref={ref}
      {...htmlProps}
      $width={colProps.width}
      $spacing={colProps.spacing}
      $spacingAround={colProps.spacingAround}
      $align={colProps.align}
      $bordered={colProps.bordered}
      $fontColor={colProps.fontColor}
      $backgroundColor={colProps.backgroundColor}
      $hover={colProps.hover}
      $pointer={colProps.pointer}
    >
      {colProps.ellipsis ? (
        <EllipsisContainer>{colProps.children}</EllipsisContainer>
      ) : (
        colProps.children
      )}
    </S.Col>
  )
})

Col.displayName = 'Col'

export default Col
