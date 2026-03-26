import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

import { CONTAINER_WIDTH } from '../../constants'
import { IconContainer } from '../Icon'

export const NameContainer = styled.div`
  display: flex;
  padding-right: ${({ theme }) => theme.spacings.s3};

  transition-property: background-color, opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;

  > div:nth-child(2) {
    flex: 1;
    padding: ${({ theme }) => theme.spacings.s1} 0;
  }

  ${({ theme }) => theme.useTypography('h3')}
  line-height: 19px;

  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`

export const ChildContainer = styled(MwEllipsisContainer)`
  padding: ${({ theme }) =>
    `${theme.spacings.s1} ${theme.spacings.s3} ${theme.spacings.s1} ${
      CONTAINER_WIDTH - 4
    }px`};
  ${({ theme }) => theme.useTypography('h3')}
  line-height: 19px;

  border-left-width: 4px;
  border-left-style: solid;
  &.active {
    border-left-color: ${({ theme }) => theme.colors.blue};
  }
  &:not(.active) {
    border-left-color: transparent;
  }
  :not(.active):not(:hover) {
    color: ${({ theme }) => theme.getColor('white', 50)};
  }

  transition-property: color, background-color, border-left-color;
  transition-duration: 0.25s;
  transition-timing-function: linear;

  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`

export const ChildrenContainer = styled.div`
  overflow: hidden;
  transition-property: opacity, height;
  transition-duration: 0.25s;
  transition-timing-function: linear;
`

export const ChevronContainer = styled.div`
  display: flex;
  align-items: center;

  transition-property: opacity, transform;
  transition-duration: 0.25s;
  transition-timing-function: linear;
`

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.white};

  :not(.active):not(.open):not(:hover) ${NameContainer} {
    opacity: 0.5;
  }

  &.active ${IconContainer} {
    border-left-color: ${({ theme }) => theme.colors.blue};
  }
  :not(.active) ${IconContainer} {
    border-left-color: transparent;
  }

  :not(.open):not(:hover) ${ChevronContainer} {
    opacity: 0;
  }

  &.open {
    ${NameContainer}, ${ChildContainer} {
      background-color: #8da3de26;
    }

    ${ChildContainer}:not(.active):hover {
      background-color: #242e47;
    }

    ${ChevronContainer} {
      transform: rotate(180deg);
    }

    ${IconContainer} > svg * {
      fill: #2a3651;
    }
  }
`

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkBlue};

  overflow-y: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;

  transition-property: width, opacity;
  transition-duration: 0.25s;
  transition-timing-function: linear;
`
