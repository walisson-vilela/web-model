import styled from 'styled-components'

export const Container = styled.div`
  border-bottom: 1px solid #dadadb;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 21px 14px;
  position: relative;
`

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    text-align: left;

    strong {
      font: normal normal bold 14px/15px Lato;
      letter-spacing: 0px;
      color: #192338;
      opacity: 1;
    }

    span {
      margin-top: 2px;
      font: normal normal normal 14px/15px Lato;
      letter-spacing: 0px;
      color: #192338;
      opacity: 0.5;
    }
  }
`
