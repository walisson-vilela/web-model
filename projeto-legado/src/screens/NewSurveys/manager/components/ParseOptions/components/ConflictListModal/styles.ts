import styled from 'styled-components'

export const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  background-color: #3455ab;
  padding: 21px;

  & > span {
    font: normal normal bold 18px/20px Lato;
    color: #ffffff;
  }
`

export const Container = styled.div`
  width: 100%;
  height: 472px;
  display: flex;
  flex-direction: column;
  padding: 21px;
  gap: 21px;
`

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  & > span {
    font: normal normal normal 14px/17px Lato;
    color: #666d7d;
  }
  & > strong {
    font: normal normal bold 18px/22px Lato;
    color: #192338;
  }
`

export const InfoInputsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`

export const More = styled.div`
  width: 35px;
  height: 35px;

  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
`

export const Body = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px;
  border: 1px solid #e2e2e3;
  border-radius: 4px;
`

export const LoaderContainer = styled.div`
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 100%;
  z-index: 99;

  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`
