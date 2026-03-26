import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s4};
  align-items: center;
  color: ${({ theme }) => theme.colors.darkestGrey};

  ${({ onClick }) => {
    if (!onClick) {
      return css`
        opacity: 0.3;
        pointer-events: none;
      `
    }

    return css`
      cursor: pointer;
    `
  }}
`
