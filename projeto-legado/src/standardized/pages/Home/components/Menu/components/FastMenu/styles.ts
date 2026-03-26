import styled from 'styled-components'

import { CONTAINER_WIDTH } from '../../constants'
import { IconContainer } from '../Icon'

const HOVER_WIDTH = 180

export const HoverContainer = styled.div`
  position: relative;

  padding: ${({ theme }) => theme.spacings.s1} 0;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  transition-property: margin-left, opacity;
  transition-duration: 0.25s;
  transition-timing-function: linear;
  z-index: 991;
  height: max-content;
  overflow: hidden;

  /* TODO: use theme color */
  border: 1px solid #dbdbdb;

  width: ${HOVER_WIDTH}px;

  :before,
  :after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: ${({ theme }) => theme.spacings.s1};
    background-color: #8da3de26;
  }
  :before {
    top: 0;
  }
  :after {
    bottom: 0;
  }

  > div {
    padding: ${({ theme }) => `${theme.spacings.s1} ${theme.spacings.s3}`};
    ${({ theme }) => theme.useTypography('p')}
    line-height: 17px;

    color: ${({ theme }) => theme.colors.white};
    :not(.active):not(:hover) {
      color: ${({ theme }) => theme.getColor('white', 50)};
    }

    background-color: #8da3de26;
    :not(.active):hover {
      background-color: #242e47;
    }

    transition-property: color, background-color;
    transition-duration: 0.25s;
    transition-timing-function: linear;

    :not(.active) {
      cursor: pointer;
    }
    &.active {
      cursor: default;
    }
  }
`

export const ItemsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;

  transition-property: opacity;
  transition-duration: 0.25s;
  transition-timing-function: linear;

  > div {
    position: absolute;
    top: 0;
    left: 0;

    overflow-y: auto;
    scrollbar-width: none;
    height: 100%;

    > div {
      display: flex;
      width: min-content;
      height: 33px;
    }

    > div:not(.disabled) > ${IconContainer} {
      cursor: pointer;
    }

    > div:not(.active):not(:hover):not(.disabled) > ${IconContainer} {
      opacity: 0.5;
    }

    > div.disabled > ${IconContainer} {
      opacity: 0.25;
    }

    > div.active > ${IconContainer} {
      border-left-color: ${({ theme }) => theme.colors.blue};
    }
    > div:not(.active) > ${IconContainer} {
      border-left-color: ${({ theme }) => theme.colors.darkBlue};
    }

    > div:not(:hover) > ${HoverContainer}, > div.disabled > ${HoverContainer} {
      margin-left: -${HOVER_WIDTH}px;
      opacity: 0;
    }
  }

  :after {
    content: '';
    height: 100%;
    width: ${CONTAINER_WIDTH}px;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 992;
  }
`
