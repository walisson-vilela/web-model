import styled from 'styled-components'

export const MainContainer = styled.div`
  flex: 1;
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  border: 1px solid ${({ theme }) => theme.getColor('lightestGrey', 80)};
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  > div {
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    :nth-child(1) {
      flex: 1;
      border-right: 1px solid
        ${({ theme }) => theme.getColor('lightestGrey', 80)};
    }
    :nth-child(2) {
      border-left: 1px solid
        ${({ theme }) => theme.getColor('lightestGrey', 80)};
    }
  }
`

export const Link = styled.div`
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.blue};
    text-decoration: underline;
  }
`
