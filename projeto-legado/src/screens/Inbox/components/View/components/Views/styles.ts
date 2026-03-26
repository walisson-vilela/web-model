import styled from 'styled-components'

export const Button = styled.div`
  display: flex;
  align-items: center;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  cursor: pointer;
  position: relative;
`
