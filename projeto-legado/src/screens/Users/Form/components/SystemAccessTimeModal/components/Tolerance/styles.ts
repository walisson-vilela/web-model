import styled from 'styled-components'

export const ToleranceContainer = styled.div`
  > div:nth-child(2) {
    margin-top: ${({ theme }) => theme.spacings.s1};
    display: flex;
    gap: ${({ theme }) => theme.spacings.s3};
  }
`
