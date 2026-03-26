import styled from 'styled-components'

export const RowLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    color: ${({ theme }) => theme.colors.darkBlue};
    :nth-child(1) {
      ${({ theme }) => theme.useTypography('p')}
      line-height: 17px;
    }
    :nth-child(2) {
      ${({ theme }) => theme.useTypography('h6')}
      line-height: 15px;
      > span {
        opacity: 0.5;
      }
    }
  }
`

export const RowAfter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    :nth-child(1) {
      width: 50%;
      align-items: center;
      justify-content: center;
    }
    :nth-child(2) {
      width: 50%;
      align-items: center;
      justify-content: end;
    }
  }
`
