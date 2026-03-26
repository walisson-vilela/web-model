import styled from 'styled-components'

const Header = styled.div`
  padding: ${({ theme }) => theme.spacings.s3};
  ${({ theme }) => theme.useTypography('h3')};
  line-height: 19px;
  color: ${({ theme }) => theme.colors.darkBlue};
`

export default Header
