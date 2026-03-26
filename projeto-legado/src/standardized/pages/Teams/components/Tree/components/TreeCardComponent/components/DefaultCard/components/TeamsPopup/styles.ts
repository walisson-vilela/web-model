import styled from 'styled-components'

export const TriggerWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  cursor: pointer;
  overflow: hidden;
`
