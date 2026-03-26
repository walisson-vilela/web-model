import styled, { keyframes } from 'styled-components'

const spinning = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(-360deg); }
`

export const Container = styled.div<{
  absolute: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  position: ${(props) => (props.absolute ? 'absolute' : 'unset')};
  background-color: white;
  z-index: 2;
`

export const LoaderContainer = styled.div`
  position: fixed;
  width: 55px !important;
  height: 55px !important;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Loader = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:after {
    content: '';
    position: absolute;

    top: calc(4px + 0px);
    left: calc(4px + 0px);
    width: calc(100% - 8px);
    height: calc(100% - 8px);

    border-width: 4px;
    border-style: solid;
    border-radius: 100%;

    animation: ${spinning} 2s linear infinite !important;
    animation-direction: reverse !important;

    border-color: #7676764a;
    border-top-color: #767676;
  }
`
