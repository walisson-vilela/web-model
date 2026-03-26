import styled from 'styled-components'

const Subtitle = styled.div`
  ${({ theme }) => theme.useTypography('h3')}
  line-height: 19px;
  color: ${({ theme }) => theme.getColor('greyishBlue', 80)};
`

export default Subtitle
