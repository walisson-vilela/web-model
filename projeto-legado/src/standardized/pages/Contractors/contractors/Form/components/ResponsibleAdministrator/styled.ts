import styled from 'styled-components'

export const Container = styled.div`
  padding: ${({ theme }) => `${theme.spacings.s4} ${theme.spacings.s3}`};
  > div:nth-child(2) {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacings.s1};
    ${({ theme }) => theme.useTypography('p')};
  }
`
