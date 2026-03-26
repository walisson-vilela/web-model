import styled from 'styled-components'

export const Title = styled.div`
  ${({ theme }) => theme.useTypography('h1')}
  margin-bottom: calc(${({ theme }) => theme.spacings.s1} / 2);

  + div {
    color: ${({ theme }) => theme.colors.darkGrey};
  }
`

export const Container = styled.div`
  position: relative;
`
