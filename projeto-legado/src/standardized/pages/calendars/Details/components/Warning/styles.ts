import styled from 'styled-components'

export const Alert = styled.div`
  background-color: ${({ theme }) => theme.colors.floralWhite};
  border: 1px solid ${({ theme }) => theme.colors.vanilla};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  padding: ${({
    theme: {
      spacings: { s3, s5 },
    },
  }) => `${s3} ${s3} ${s3} ${s5}`};

  > div:nth-child(1) {
    color: ${({ theme }) => theme.colors.bronze};
    ${({ theme }) => theme.useTypography('h1')}
    line-height: 23px;
  }
  > div:nth-child(2) {
    color: ${({ theme }) => theme.getColor('bronze', 80)};
    ${({ theme }) => theme.useTypography('p')}
    line-height: 17px;
  }
`
