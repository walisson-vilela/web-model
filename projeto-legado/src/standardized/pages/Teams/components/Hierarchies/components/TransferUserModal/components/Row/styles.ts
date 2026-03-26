import styled from 'styled-components'

export const RowName = styled.div`
  align-self: start;
  overflow: hidden;
  max-width: 100%;
`

export const RowCard = styled.div`
  display: flex;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  overflow: hidden;
  max-width: 100%;

  .bolder {
    font-weight: bold;
  }

  > * {
    white-space: nowrap;
  }
`
