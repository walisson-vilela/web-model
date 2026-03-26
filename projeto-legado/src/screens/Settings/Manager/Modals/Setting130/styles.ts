import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-direction: column;
  margin-top: 21px;
`

export const SliderInput = styled.input`
  width: 161.5px;
  height: 22px;
`

export const Textbox = styled.div`
  margin-top: 21px;
  padding: 14px;
  height: 93px;
  background: #fffaf3 0% 0% no-repeat padding-box;
  border: 1px solid #ccbea0;
  border-radius: 4px;
  opacity: 1;
`

export const Title = styled.div`
  text-align: left;
  font: normal normal 900 14px/24px Lato;
  letter-spacing: 0px;
  color: #7a4d05cc;
`

export const Text = styled.div`
  text-align: left;
  letter-spacing: 0px;
  color: #7a4d05cc;
  opacity: 1;
`

export const LoaderContainer = styled.div`
  position: absolute;
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
export const divRelative = styled.div`
  position: relative;
`
export const DivSpan = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`

export const PopUpText = styled.div`
  width: 369px;
  text-align: left;
  ul {
    padding-left: 18px;
    margin: 14px 0 0 0;
  }
  :before {
    position: absolute;
    content: '';
    width: 0.71428571em;
    height: 0.71428571em;
    transform: rotate(45deg);
    background-color: #192338;
    z-index: 3;
    top: 50%;
    left: -0.30714286em;
    bottom: auto;
    right: auto;
    margin-top: -0.30714286em;
  }
`
