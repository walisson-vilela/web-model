import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  > div {
    :nth-child(2) {
      flex: 1;
      margin-top: ${({ theme }) => theme.spacings.s1};
      margin-bottom: ${({ theme }) => theme.spacings.s3};
    }
    :nth-child(3) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: ${({ theme }) => theme.spacings.s1};

      > div:nth-child(1) {
        ${({ theme }) => theme.useTypography('p')}
        color: ${({ theme }) => theme.colors.grey};
      }
    }
  }
`
