import styled from 'styled-components'

export const YearContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};
  padding: 0 ${({ theme }) => theme.spacings.s3};
  height: ${({ theme }) => theme.spacings.s6};

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  text-align: center;

  border-bottom: 1px solid ${({ theme }) => theme.getColor('lightestGrey', 80)};
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  padding: ${({ theme }) =>
    `${theme.spacings.s1} 0px ${theme.spacings.s1} ${theme.spacings.s3}`};
`

export const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
`
