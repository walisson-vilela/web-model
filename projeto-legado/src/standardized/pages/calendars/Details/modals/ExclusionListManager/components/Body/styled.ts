import styled from 'styled-components'

export const ContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  position: relative;
`
