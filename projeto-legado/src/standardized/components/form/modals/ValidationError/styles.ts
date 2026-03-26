import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;

  > div {
    display: flex;
    gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  }
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  padding-left: ${({ theme }) => theme.spacings.s4};
  margin: 0;

  list-style-type: square;

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
`
