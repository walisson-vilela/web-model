import styled from 'styled-components'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
`
