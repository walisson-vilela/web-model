import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1366px;
  height: 768px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;

  section {
    flex: 1;
    width: 100%;
    margin-top: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

export const Header = styled.div`
    width:1058px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding-top:8px;

    strong{
        font-size:15px;
    }
    svg{
        cursor:pointer;
    }
}
`

export const LeftContent = styled.div`
  margin-top: 40px;
  flex: 1;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    strong {
      font: normal normal 600 17px 'Lato';
      cursor: pointer;

      & + strong {
        margin-top: 4px;
      }
    }
  }

  .currentDay {
    border-bottom: 1px solid #000;
  }

  .modal-widget14 {
    width: 380px;
    height: 220px;
  }
`
export const RightContent = styled(LeftContent)`
  width: 600px;
  margin-top: 40px;
  div {
    strong {
      margin: 0 2px;

      &:last-child {
        margin: 0;
        margin-left: 1px;
      }
    }
  }
`
export const Icons = styled.div`
  width: 100%;
  max-width: 209px;
  height: 38px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  bottom: 24px;
`

export const Percentage = styled.strong`
  position: relative;
  bottom: 40px;
  font-size: 17px;
  font-weight: bold;
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    color: #6b7686;
  }

  & + div {
    padding-left: 10px;
  }
`

export const PopUpContent = styled.div`
  width: 100% !important;
  height: 100% !important;

  .content {
    width: 100% !important;
    max-width: 149px !important;
    margin: auto !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: left !important;
    margin: 0;

    .title,
    .p1,
    .p2 {
      width: 100% !important;
      text-align: left !important;
      margin: 0;
      padding: 0;
    }
  }
`

interface TextProps {
  currentDay: boolean
}

export const Text = styled.strong<TextProps>`
  ${(props) =>
    props.currentDay &&
    css`
      border-bottom: 1px solid #000;
    `}
`
