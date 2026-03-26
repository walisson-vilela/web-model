import styled from 'styled-components'

const Header = styled.div`
  padding: ${({ theme }) => `${theme.spacings.s1} ${theme.spacings.s3}`};
  ${({ theme }) => theme.useTypography('h4')}
  line-height: 17px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};
`

export default Header
