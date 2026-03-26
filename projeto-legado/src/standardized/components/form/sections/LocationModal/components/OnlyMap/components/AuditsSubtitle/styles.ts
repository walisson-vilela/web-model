import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacings.s4};
  right: ${({ theme }) => theme.spacings.s4};
  padding: ${({ theme }) => theme.spacings.s1};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightestGrey};
`
