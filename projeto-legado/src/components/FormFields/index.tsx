import React from 'react'

import { SemanticWIDTHSNUMBER } from 'semantic-ui-react'

import * as S from './styles'

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[]
  itemSpacing?: number | [number, number]
  align?: 'bottom' | 'top' | 'center'
  justify?: 'left' | 'right' | 'center' | 'between'
}

const Row = ({ children, ...rest }: RowProps) => (
  <S.Row {...rest}>{children}</S.Row>
)

interface ColumnProps {
  children: JSX.Element | JSX.Element[]
  size?: SemanticWIDTHSNUMBER
}

const Column = ({ children, size }: ColumnProps) => (
  <S.Column size={size}>{children}</S.Column>
)

interface ErrorProps {
  condition: boolean
  message: string
}

interface LabelProps {
  children: JSX.Element | JSX.Element[]
  label: string
  required?: boolean
  errors?: ErrorProps[]
  style?: React.CSSProperties
}

const Label = (props: LabelProps) => {
  const { children, label, required, style } = props
  const errors: ErrorProps[] = props.errors ? props.errors : []

  let haveErrors: boolean = errors.filter((e) => e.condition).length > 0
  let firstErrorMessage: ErrorProps = errors.find((e) => e.condition)

  return (
    <S.Label error={haveErrors} style={style}>
      <span>{[label, required ? '*' : null].filter(Boolean).join('')}</span>

      {children}

      {haveErrors && <small>{firstErrorMessage.message}</small>}
    </S.Label>
  )
}

export const Grid = {
  Row,
  Column,
  Label,
}
