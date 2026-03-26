import styled, { css } from 'styled-components'

import type { TabsProps } from '../../../../interfaces'

export const StyledTab = styled.div<{
  $primary?: boolean
  $hasSiblings?: boolean
  $internal?: TabsProps['internal']
}>`
  position: relative;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};

  background-color: var(--bgColor);
  color: var(--color);

  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s3} ${theme.spacings.s3}`};
  box-shadow: ${({ $internal, theme }) =>
    $internal ? 'none' : `0px 2px 8px ${theme.getColor('black', 16)}`};
  transition: --color 0.5s, --bgColor 0.5s;

  border-radius: ${({ $internal }) => ($internal ? '3px 3px 0 0' : '0')};

  /* Pseudo-element para o degradê */
  &.overflow::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 34px;
    height: 100%;

    background-image: linear-gradient(
      to right,
      transparent,
      var(--bgColor) 80%
    );
    transition: --color 0.5s, --bgColor 0.5s;
  }

  ${({ $primary, $hasSiblings, $internal }) =>
    $primary &&
    $hasSiblings &&
    !$internal &&
    css`
      &::before {
        content: '';
        position: absolute;
        left: 4px;
        top: 4px;
        bottom: 4px;
        width: 3px;
        background-color: var(--colorBefore);
        transition: --colorBefore 0.5s;
        border-radius: 2px;
      }
    `}
`
