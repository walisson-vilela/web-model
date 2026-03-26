import styled from 'styled-components'

export const FooterMessage = styled.div`
  margin: auto auto auto 0;

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  color: ${({ theme }) => theme.colors.grey};
`
