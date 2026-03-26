import styled from 'styled-components'

export const TitleParameterRadius = styled.b`
  width: 100%;
  display: block;
  background-color: ${({ theme }) => theme.colors.lightestGrey};

  padding: ${({ theme }) => `${theme.spacings.s3} `};
`

export const InputContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};
`
