import styled from 'styled-components'

export const ModifierContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  white-space: nowrap;
`
