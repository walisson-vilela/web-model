import styled from 'styled-components'

const Container = styled.div`
  ${({ theme }) => theme.useTypography('p')};

  padding-right: calc(${({ theme }) => theme.spacings.s1} / 2);
  display: flex;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`

export default Container
