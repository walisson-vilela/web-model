import styled from 'styled-components'

export const Counter = styled.div`
  ${({ theme }) => theme.useTypography('h6')}
  line-height: 13px;
  color: #9e9e9e;
  padding-top: ${({ theme }) => theme.spacings.s1};
  padding-bottom: ${({ theme }) => theme.spacings.s1};
  text-align: end;
`
