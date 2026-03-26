import styled from 'styled-components'

export const MessageHeader = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  ${({ theme }) => theme.useTypography('p')};
`
