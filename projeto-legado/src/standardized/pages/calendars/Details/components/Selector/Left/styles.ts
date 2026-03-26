import styled from 'styled-components'

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};

  i {
    margin: 0 !important;
  }
`
