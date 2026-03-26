import styled from 'styled-components'

export const PopupContainer = styled.div`
  width: 450px;
  height: 270px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const PopupHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

export const PopupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  & > strong {
    font: normal normal 900 16px/24px Lato;
    color: #000000cc;
  }

  & > span {
    font: normal normal normal 14px/24px Lato;
    color: #000000cc;

    & > strong {
      font: normal normal 900 14px/24px Lato;
      color: #000000cc;
    }
  }
`

export const PopupSearch = styled.div``

export const PopupBody = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const PopupList = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid #e2e2e2;
  padding: 7px;
  flex-direction: column;
  gap: 4px;

  & > strong {
    font: normal normal medium 14px/17px Lato;
    color: #263046;
  }

  & > span {
    font: normal normal medium 14px/17px Lato;
    color: #263046;
    opacity: 0.5;
  }
`
