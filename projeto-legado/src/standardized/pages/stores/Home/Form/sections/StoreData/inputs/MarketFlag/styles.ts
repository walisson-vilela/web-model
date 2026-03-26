import styled from 'styled-components'

export const LabelContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  > div {
    :not(:nth-child(1)) {
      opacity: 0.5;
    }
  }
`
