import styled from 'styled-components'

interface TitleProps {
  $marginBottom?: string
}

const Subtitle = styled.div<TitleProps>`
  color: ${({ theme }) => theme.colors.darkBlue};

  ${({ theme }) => theme.useTypography('h3')};
  line-height: 22px;

  margin-bottom: ${({ $marginBottom: marginBottom }) => marginBottom || '0'};
`

export default Subtitle
