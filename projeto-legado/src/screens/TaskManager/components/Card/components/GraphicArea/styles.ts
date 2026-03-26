import styled from 'styled-components'

export const GraphicAreaContainer = styled.div`
  width: 100% !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 14px 19px !important;
`
export const Content = styled.div`
  flex: 1;

  .wrapper {
    display: flex;
    align-items: center;
    width: 100%;

    ul {
      display: flex;
      flex-direction: column;
      gap: 4px;
      list-style: none;
      margin: 0;
      padding: 0;
      height: 100%;
      margin-right: 8px;

      li {
        padding: 0;
        margin: 0;
      }
    }
  }

  .graphic-container {
    width: 100%;
  }
`

export const GraphicStatic = styled.div`
  height: 35px;
  width: 120px;
  margin-left: 23px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  h3 {
    width: 100%;
    font-size: 22px;
    margin: 0;
    padding: 0;
    text-align: right;
  }

  strong {
    width: 100%;
    margin: 0;
    padding: 0;
    color: #707070;
    margin: 2px 0;
    text-align: right;
  }
  span {
    width: 100%;
    display: inline-block;
    text-align: right;
    margin-top: 2px;
    font: normal normal normal 13px Lato;
  }
`

export const Graphic = styled.div`
  width: 100%;
  border-top: 1px solid #0000001a;
  border-left: 1px solid #0000001a;
  border-bottom: 1px solid #0000001a;
  height: 100%;
  margin-right: 20px;
`

interface ProgressBar {
  percentage: number
  color: string
}
export const ProgressBar = styled.div<ProgressBar>`
  height: 12px;
  width: ${(props) => props.percentage}%;
  background-color: ${(props) => props.color};
  & + div {
    margin-top: 12px;
  }
`

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .divider {
    width: 15px;
    height: 15px;
    background-color: transparent;
  }
`

export const Range = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 8px;
`
