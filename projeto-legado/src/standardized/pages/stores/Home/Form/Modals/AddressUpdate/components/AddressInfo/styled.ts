import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  margin-bottom: ${({ theme }) => theme.spacings.s4};
`
export const Title = styled.div``
export const Address = styled.div`
  ${({ theme }) => theme.useTypography('p')}
`
