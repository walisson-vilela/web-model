import styled, { css } from 'styled-components'

export const ErrorMessage = styled.small`
  font-size: 14px;
  font-weight: 500;
  color: #c31717;

  ${({ children }) => {
    if (children) return
    return css`
      :after {
        content: ' ';
        white-space: pre;
      }
    `
  }}
`
