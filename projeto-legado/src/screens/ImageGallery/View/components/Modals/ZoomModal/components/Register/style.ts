import styled from 'styled-components'

export const Content = styled.div`
  width: 100%;
  height: calc(100% - 66px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const HeaderInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3.5px;

  strong {
    font: normal normal bold 14px/17px Lato;
    color: #000000;
    svg {
      margin-left: 8px;
    }
  }
  span {
    font: normal normal medium 13px/16px Lato;
    color: #505d6f;
  }
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 14px;
  overflow-y: auto;
`

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
