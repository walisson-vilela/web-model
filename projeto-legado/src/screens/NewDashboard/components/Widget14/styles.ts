import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const WidgetContainer = styled.div`
  width: 48%;

  height: 264px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 5px;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 36px;
  h3 {
    padding: 2px 0;
    font: normal normal bold 14px/17px 'Lato';
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
  }

  svg {
    margin-right: 4px;
    cursor: pointer;
  }
`

export const Title = styled.div`
  padding: 14px 0;
  margin: 0 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  strong {
    flex: 1;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
  }

  div {
    width: 60px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  img {
    cursor: pointer;
    margin-top: 4px;
  }
`
export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    strong {
      font: normal normal 600 14px/17px 'Lato';
      cursor: pointer;

      & + strong {
        margin-top: 4px;
      }
    }
  }

  .currentDay {
    border-bottom: 1px solid #000;
  }

  .widget14 {
    width: 270px;
    height: 130px;
  }

  @max-width (max-width:1400px) and (max-width: 1499px) {
    width: 280px;
  }

  @media (min-width: 1500px) and (max-width: 1590px) {
    strong {
      size: 16px;
    }
    .widget14 {
      width: 294px;
      height: 134px;
      padding-left: 9px;
    }
  }
`
export const RightContent = styled(LeftContent)`
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
  width: 209px;
  height: 38px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  bottom: 24px;

  @media (min-width: 1540px) {
    margin-left: 7px;
  }
`

export const Percentage = styled.strong`
  position: relative;
  bottom: 40px;
  font-size: 17px;
  font-weight: bold;

  @media (min-width: 1540px) {
    left: 7px;
  }
`

export const Item = styled.div`
    width:209px;
    margin:
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

    &:nth-child(1){
        border-right:1px solid #9AA1A9;
        padding-right: 14.5px;
        strong{
            width:100%;
            display:inline-block;
            text-align:right;
        }
    }

    &:nth-child(2){
        border-right: 1px solid #9AA1A9;
        padding-right: 14.5px;
    }

    &:nth-child(3){
        border-left: 1px solid ##9AA1A9;
        padding-left: 14.5px;
        strong{
            text-align:left;
            width:100%;
        }
    }
`

export const PopUpContent = styled.div`
  width: 100% !important;
  height: 100% !important;

  .content {
    width: 149px !important;
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
