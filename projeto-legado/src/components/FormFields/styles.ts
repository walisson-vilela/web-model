import { SemanticWIDTHSNUMBER } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

interface RowProps {
  itemSpacing?: number | [number, number]
  align?: 'bottom' | 'top' | 'center'
  justify?: 'left' | 'right' | 'center' | 'between'
}

interface ColumnProps {
  size?: SemanticWIDTHSNUMBER
}

export const Row = styled.div<RowProps>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: ${({ itemSpacing }) =>
    itemSpacing !== undefined
      ? typeof itemSpacing === 'number'
        ? `${itemSpacing}px`
        : `${itemSpacing[1]}px`
      : '7px'};

  justify-content: ${({ justify }) => {
    switch (justify) {
      case 'left':
        return 'flex-start'
      case 'right':
        return 'flex-end'
      case 'center':
        return 'center'
      case 'between':
        return 'space-between'
      default:
        return 'unset'
    }
  }};

  align-items: ${({ align }) => {
    switch (align) {
      case 'center':
        return 'center'
      case 'top':
        return 'flex-start'
      case 'bottom':
        return 'flex-end'
      default:
        return 'unset'
    }
  }};

  &:not(:first-child) {
    margin-top: ${({ itemSpacing }) =>
      itemSpacing !== undefined
        ? typeof itemSpacing === 'number'
          ? `${itemSpacing}px`
          : `${itemSpacing[0]}px`
        : '7px'};
  }
`

export const Column = styled.div<ColumnProps>`
  width: ${({ size }) => (size ? `calc(6.75% * ${size})` : '100%')};
`

interface LabelProps {
  error?: boolean
}

export const Label = styled.label<LabelProps>`
  span {
    font-size: 14px;
    font-weight: normal;
    padding-bottom: 7px;
    display: block;
  }

  small {
    display: block;
    margin: 0;
    font-size: 11px;
  }

  span,
  small {
    color: ${({ error }) => (error ? '#9F3A38' : '#263046')};
  }

  > div,
  button {
    width: 100%;
  }

  ${({ error }) =>
    error &&
    css`
      input {
        border-color: #9f3a38 !important;
        color: #9f3a38 !important;
      }
    `}
`
