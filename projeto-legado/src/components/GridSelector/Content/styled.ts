import styled from 'styled-components'

export const Title = styled.div`
  ${({ theme }) => theme.useTypography('h2', { fontWeight: 'bold' })}
  line-height:19px;
`
