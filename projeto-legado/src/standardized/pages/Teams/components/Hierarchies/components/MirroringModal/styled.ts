import styled from 'styled-components'

export const SubTitle = styled.div`
  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};

  > div {
    ${({ theme }) => theme.useTypography('p')};
    line-height: 17px;
    color: ${({ theme }) => theme.getColor('black', 80)};
  }
`
