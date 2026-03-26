import styled from 'styled-components'

export const Container = styled.div`
  width: 305px;
  padding: 0;
  margin: 0;
`

export const Header = styled.div`
  div {
    padding: 14px;
    strong {
      text-align: left;
      letter-spacing: 0px;
      color: #000000cc;
      opacity: 1;
    }

    p {
      margin-top: 14px;
      text-align: left;
      font: normal normal normal 14px/20px Lato;
      letter-spacing: 0px;
      color: #263046;
      opacity: 0.7;
    }
  }
`
export const Footer = styled.div`
  border-top: 1px solid #dadadb;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 14px;
  gap: 7px;
`
