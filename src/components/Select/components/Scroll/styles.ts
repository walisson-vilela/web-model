import styled from 'styled-components'

import { Checkmark } from '../../../Input/components/Checkbox/styles'

export const ListContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`

export const ListScroll = styled.div`
  overflow-y: scroll;
  overflow-y: overlay;
  width: 100%;
  height: 100%;

  /* Firefox */
  @supports (scrollbar-width: thin) {
    .scroll {
      scrollbar-color: ${({ theme }) =>
        `${theme.colors.grey} ${theme.colors.white}`};
      scrollbar-width: thin;
    }
  }

  /* Chrome/Edge/Safari (WebKit/Blink) */
  @supports selector(::-webkit-scrollbar) {
    &::-webkit-scrollbar {
      width: ${({ theme }) => theme.spacings.s1};
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.grey};
    }
    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.white};
    }
  }
`

export const ListInner = styled.div`
  position: relative;
  width: 100%;
`

export const EmptyMessage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.useTypography('p')}
  color: ${({ theme }) => theme.getColor('greyishBlue', 80)};
`

export const MultiHighlight = Checkmark

export const SingleHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 3px;

  transition-property: background-color;
  transition-timing-function: linear;
  transition-duration: 0.25s;
`

export const OptionRow = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};

  background-color: ${({ theme, $active: active }) =>
    active ? theme.getColor('blue', 15) : theme.colors.white};
  padding: ${({ theme }) => theme.spacings.s3};

  ${({ theme }) => theme.useTypography('p')}
  color: ${({ theme }) => theme.colors.greyishBlue};

  border-bottom-width: 1px;
  border-bottom-style: solid;
  &:nth-last-child(1) {
    border-bottom-color: transparent;
  }
  &:not(:nth-last-child(1)) {
    border-bottom-color: ${({ theme }) => theme.getColor('greyishBlue', 10)};
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &:not([aria-disabled='true']) {
    cursor: pointer;
    opacity: 1;
  }

  &[aria-selected='true'] > ${SingleHighlight} {
    background-color: ${({ theme }) => theme.colors.blue};
  }
  &:not([aria-selected='true']) > ${SingleHighlight} {
    background-color: transparent;
  }

  > ${MultiHighlight} {
    background-color: ${({ theme, $active: active }) =>
      active ? theme.colors.iceWhite : theme.colors.white};
  }

  &[aria-selected='true'] > ${MultiHighlight} {
    border-color: ${({ theme }) => theme.colors.blue};
  }
  &[aria-selected='true'] > ${MultiHighlight}:after {
    width: 5px;
    height: 9.5px;
    border-width: 0 2px 2px 0;
    left: 5px;
    top: 1px;
  }
  &:not([aria-selected='true']) > ${MultiHighlight} {
    border-color: ${({ theme }) => theme.colors.lightestGrey};
  }

  transition-property: background-color, opacity;
  transition-timing-function: linear;
  transition-duration: 0.25s;
`
