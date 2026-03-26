import styled from 'styled-components'

export const FieldWrapper = styled.span`
  > div > label {
    width: fit-content;
    padding: ${({ theme }) => theme.spacings.s1};
  }
`

export const ButtonWrapper = styled.div`
  margin-left: auto;
`

interface TitleProps {
  marginBottom?: string
}

export const TitleWrapper = styled.div<TitleProps>`
  ${({ theme }) => theme.useTypography('h1')};
  ${({ theme }) => theme.colors.greyishBlue};
`
