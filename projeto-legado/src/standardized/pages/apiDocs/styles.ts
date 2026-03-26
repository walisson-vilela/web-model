import styled from 'styled-components'

export const MainContainer = styled.div`
  position: relative;
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Error = styled.div`
  ${({ theme }) => theme.useTypography('h4')}
  line-height: 17px;
  color: ${({ theme }) => theme.colors.warningRed};
`
