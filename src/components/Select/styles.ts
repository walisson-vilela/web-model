import styled, { css } from 'styled-components'

import { MENU_EXIT_MS } from './constants'

export const FloatingWrapper = styled.div`
  z-index: 1000;

  &,
  & > div {
    height: var(--height);
    min-height: var(--height);
    max-height: var(--height);
  }

  > div {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-top: ${({ theme }) => theme.spacings.s1};

    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  transition-property: height, max-height, min-height;
  transition-timing-function: linear;
  transition-duration: ${MENU_EXIT_MS}ms;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-radius: 6px;
  box-shadow: 0px 3px 6px ${({ theme }) => theme.getColor('black', 15)};
  overflow: hidden;
`

type TriggerProps = {
  $empty: boolean
  $open: boolean
  $viewMode: boolean | undefined
}

export const Trigger = styled.button<TriggerProps>`
  width: 100%;

  transition-property: opacity, border-color, box-shadow, color,
    background-color;
  transition-timing-function: linear;
  transition-duration: 0.25s;

  ${({ $viewMode: viewMode }) =>
    viewMode
      ? css`
          padding: 0;

          border: none;
        `
      : css`
          min-height: 35px;
          padding: 0 ${({ theme }) => theme.spacings.s3};

          border-style: solid;
          border-width: 1px;
          border-radius: 4px;
        `}

  outline: none !important;

  &:focus-visible {
    box-shadow: 3px 3px 6px ${({ theme }) => theme.getColor('black', 15)};
  }

  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacings.s1};

  ${({ theme }) => theme.useTypography('p')}

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.warningRed};
    color: ${({ theme }) => theme.colors.warningRed};
    background-color: ${({ theme }) => theme.getColor('warningRed', 5)};
  }
  &:not([aria-invalid='true']) {
    border-color: ${({ theme }) => theme.colors.lightGrey};
    color: ${({ theme, $empty: empty }) => {
      return empty ? theme.colors.darkGrey : theme.colors.darkBlue
    }};
    background-color: ${({ theme }) => theme.colors.white};
  }

  &:disabled {
    opacity: 0.5;
  }

  &:not(:disabled),
  &:not([aria-readonly='true']) {
    cursor: pointer;
  }

  &:disabled,
  &[aria-readonly='true'] {
    pointer-events: none;
  }

  > i {
    transition-property: transform;
    transition-timing-function: linear;
    transition-duration: 0.25s;
    transform: rotate(${({ $open: open }) => (open ? '180deg' : '0deg')});
  }
`

export const TriggerValue = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

type LabelProps = {
  $viewMode: boolean | undefined
}

export const Label = styled.label<LabelProps>`
  display: inline-block;
  margin-bottom: ${({ theme, $viewMode: viewMode }) =>
    theme.spacings[viewMode ? 's3' : 's1']};

  ${({ theme, $viewMode: viewMode }) =>
    theme.useTypography('p', {
      fontWeight: viewMode ? 'bold' : 'normal',
    })}
  color: ${({ theme }) => theme.colors.greyishBlue};

  transition-property: opacity, border-color, box-shadow, color,
    background-color;
  transition-timing-function: linear;
  transition-duration: 0.25s;

  &:has(+ [aria-required='true']):after {
    content: ' *';
  }

  &:has(+ :disabled) {
    opacity: 0.5;
  }
`

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  overflow: hidden;

  > div {
    display: flex;
    gap: calc(${({ theme }) => theme.spacings.s1} / 2);
    color: ${({ theme }) => theme.colors.darkBlue};
    white-space: nowrap;
  }

  > div:nth-child(1) {
    ${({ theme }) => theme.useTypography('p')}
  }

  > div:not(:nth-child(1)) {
    ${({ theme }) => theme.useTypography('h6')}
    opacity: 0.5;
  }
`
