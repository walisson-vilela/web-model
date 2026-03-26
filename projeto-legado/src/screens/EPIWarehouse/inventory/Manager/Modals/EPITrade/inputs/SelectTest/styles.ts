import styled, { css } from 'styled-components'

export const ErrorMessage = styled.span`
  margin-top: 3.5px;
  color: ${({ theme }) => theme.colors.red};
  display: inline-block;

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

export const IconContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
`

