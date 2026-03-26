import { ColorOptions } from '@mw-kit/mw-ui/dist/theme/interfaces'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  padding-bottom: 14px;
`

export const Widgets = styled.div`
  flex: 1;
  overflow-y: auto;
`

export const Card = styled.div`
  border-radius: 7px;
  box-shadow: 2px 2px 10px -7px #00000080;
  border: 1px solid #e2e2e3;
  background-color: white;

  &:not(:last-child) {
    margin-bottom: 14px;
  }
`

interface PopupContentProps {
  direction?: 'column' | 'row'
}

export const PopupContent = styled.div<PopupContentProps>`
  display: flex;

  margin-top: 14px;
  gap: 8px;
  ${({ direction = 'column' }) => css`
    flex-direction: ${direction};

    ${direction === 'column' &&
    css`
      max-height: 100px;
    `}
  `}
  span {
    & div:nth-child(3) {
      margin-left: 8px;
    }
  }
`

interface ColoredProps {
  color?: ColorOptions | string
}

export const Colored = styled.span<ColoredProps>`
  color: ${({ color, theme }) => theme.colors[color] || color};
`

export const ButtonContainer = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  display: flex;
  align-items: center;
  gap: 7px;

  > div > svg {
    cursor: pointer;

    & path {
      fill: #dbdb;
    }

    &:hover path {
      fill: ${({ theme: { colors } }) => colors.blue};
    }
  }
`

export const Wrapper = styled.div`
  width: 73px;
  display: flex;
  align-items: center;
  gap: 0 8px;
`
