import styled from 'styled-components'

export const HeaderContainer = styled.div`
  width: 100%;
  padding: 18px;
  background-color: #3455ab;

  strong {
    font: normal normal bold 18px/20px Lato;
    color: #ffffff;
  }
`

export const Container = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  gap: 28px;

  padding: 7px 21px;
`

export const InformationContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const Information = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;

  padding-block: 14px;

  & > strong {
    font: normal normal 900 14px/24px Lato;
    color: #000000cc;
  }

  & > span {
    font: normal normal normal 14px/20px Lato;
    color: #000000cc;
  }

  border-bottom: 1px solid #e2e2e2;
`

export const OperationTime = styled.div`
  display: flex;
  flex-direction: column;

  & > span {
    font: normal normal normal 14px/17px Lato;
    color: #707070;
  }
`

export const Day = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;

  padding-block: 14px;

  & > strong {
    font: normal normal 900 14px/24px Lato;
    color: #000000cc;
  }
`

export const ManagerContainer = styled.div`
  flex: 2;
  margin-top: 14px;
`

export const GrayText = styled.span`
  color: #707070;
`
