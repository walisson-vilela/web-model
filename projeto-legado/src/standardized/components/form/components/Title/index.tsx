import styled from 'styled-components'

interface TitleProps {
  $marginBottom?: string
}

const Title = styled.div<TitleProps>`
  color: ${({ theme }) => theme.colors.darkBlue};

  ${({ theme }) => theme.useTypography('h1')};
  line-height: 22px;

  margin-bottom: ${({ theme, $marginBottom: marginBottom }) =>
    marginBottom || theme.spacings.s1};

  display: flex;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  align-items: center;
`

export default Title
