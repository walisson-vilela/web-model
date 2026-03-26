import styled from 'styled-components'

export * from '../styles'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  justify-content: center;
`
