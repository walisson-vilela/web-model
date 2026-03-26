import styled, { css } from 'styled-components'

export const HeaderContainer = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.s3} 0 ${theme.spacings.s1} ${theme.spacings.s3};
  `}
`
