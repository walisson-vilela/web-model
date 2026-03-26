import styled, { css } from 'styled-components'

export const Label = styled.div<{
  $required?: boolean
}>`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacings.s1};

  ${({ $required: required }) => {
    if (!required) return

    return css`
      &:after {
        content: ' *';
      }
    `
  }}
`
