import styled from 'styled-components'

export const DaysContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s3};
  padding: ${({ theme }) => theme.spacings.s1} 0;

  > {
    :first-child {
      font-weight: bold;
    }
    :first-child,
    :last-child {
      margin-right: auto;
    }
  }
`
