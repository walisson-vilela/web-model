import styled from 'styled-components'

export const Container = styled.div`
  height: 470px;
  position: relative;
  background-color: #707070;
`

export const Description = styled.p`
  margin: 0;
  width: 200px;
  position: absolute;
  left: calc(50% - 100px);
  bottom: 55px;
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`

export const ChangeZoom = styled.div`
  position: absolute;
  right: 30px;
  bottom: 10%;
`

export const ZoomButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 35px;
  cursor: pointer;
  font-size: 35px;
  line-height: 1em;
  color: #dcdee0;
  opacity: 1;
  background-color: white;
  border: 1px solid #dcdee0;

  :hover {
    background-color: #eeeeee;
    color: #cbcdcf;
  }

  :disabled {
    background-color: #dddddd;
    color: #babcbe;
  }

  &:first-child {
    border-radius: 7px 7px 0 0;
    border-bottom: none;
  }

  &:last-child {
    border-radius: 0 0 7px 7px;
  }
`

export const Title = styled.span`
  font-size: 13px;
  color: #b0b0b0;

  b {
    font-weight: bolder;
    color: #192338;
  }
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
