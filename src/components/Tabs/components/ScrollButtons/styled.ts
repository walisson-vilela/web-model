import styled, { css } from 'styled-components'

export const Container = styled.div<{ $internal?: boolean }>`
  overflow-x: auto;
  scrollbar-width: thin;
  scroll-behavior: smooth;
  display: flex;
  width: 100%;

  scrollbar-gutter: stable;

  -ms-overflow-style: none; /* IE / Edge antigos */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  ${({ theme, $internal: internal }) =>
    internal &&
    css`
      gap: ${theme.spacings.s6};
    `}
`
