import styled, { css } from 'styled-components'

import { getSpacings } from '../../functions/formatters'
import type { ThemeInterface } from '../../interfaces'

import type { TabsProps } from './interfaces'

type TabsContainerProps = {
  $internal?: TabsProps['internal']
  $delimiter?: TabsProps['delimiter']
  $spacing?: TabsProps['spacing']
}

const delimiters: {
  [K in Exclude<TabsProps['delimiter'], undefined | 'none'>]: Parameters<
    ThemeInterface['getColor']
  >
} = {
  blue: ['blue'],
  grey: ['warningGray'],
}

export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  padding: ${({ theme }) => `${theme.spacings.s4} 0 ${theme.spacings.s4}`};
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightestGrey};
`

export const ContentContainer = styled.div`
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const Tabs = styled.div<TabsContainerProps>`
  position: relative;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  display: flex;
  flex: 0 0 auto;
  width: 100%;
  white-space: nowrap;

  ${({ $spacing: spacing }) => {
    const [top, right, bottom, left] = getSpacings(spacing || {}, {
      top: '0',
      right: '0',
      bottom: 's4',
      left: '0',
    }).split(' ')
    return css`
      margin: ${top} 0 ${bottom} 0;
      padding: 0 ${right} 0 ${left};
    `
  }}

  ${({ theme, $internal: internal, $delimiter: delimiter }) => {
    const border =
      delimiter === 'none'
        ? 'none'
        : internal
        ? `1px solid ${theme.getColor(...delimiters[delimiter || 'grey'])}`
        : `2px solid ${theme.getColor(...delimiters[delimiter || 'blue'])}`

    return css`
      border-bottom: ${border};
      + ${ComponentContainer} {
        border: 0;
      }
    `
  }}


  /* exibe as setas de navegação visíveis ao passar o mouse sobre o container */
  &:hover .scroll-arrow.visible:nth-child(1) {
    left: 0;
  }
  & .scroll-arrow:nth-child(1) {
    left: -16px;
  }

  &:hover .scroll-arrow.visible:nth-last-child(1) {
    right: 0;
  }
  & .scroll-arrow:nth-last-child(1) {
    right: -16px;
  }
`
