import styled from 'styled-components'

export const Container = styled.div`
  height: 317px;
`

export const DivContainer = styled.div`
  width: 250.5px;
  height: 35px;
  display: flex;
  flex-direction: column;
  padding-bottom: 178.61px;

  .ui.toggle.checkbox input:checked ~ label:before {
    background-color: #3455ab !important;
    border-color: #3455ab !important;
  }
  .ui.toogle.checkbox input:checked ~ .box:before,
  .ui.toogle.checkbox input:checked ~ label:before {
    background-color: #3455ab !important;
    border-color: #3455ab !important;
  }
  .ui.toggle.checkbox input:checked ~ .box:before,
  .ui.toggle.checkbox input:checked ~ label:before {
    border-color: #3455ab !important;
    background-color: #3455ab !important;
  }
  .ui.toggle.checkbox input:checked ~ label:before {
    background-color: #3455ab !important;
  }
`

export const SpanContainer = styled.span`
  margin-top: 16.12px;
  text-align: left;
  font: normal normal medium 14px/17px Lato;
  letter-spacing: 0px;
  color: #192338;
  opacity: 1;
  margin-bottom: 7px;
  display: flex;
  flex-direction: column;
`
