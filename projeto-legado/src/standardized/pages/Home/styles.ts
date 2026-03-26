import styled, { css, keyframes } from 'styled-components'

export const Container = styled.div`
  background: #fcfcfc;
  width: 100%;
  height: 100%;
  display: flex;
`

export const Body = styled.div`
  position: relative;
  flex: 1;
  background: #fcfcfc;

  display: flex;
  flex-direction: column;
  overflow: visible;
`

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: opacity 400ms ease-out;
  // o valor de 55px é a altura do header
  height: calc(100% - 55px);
  padding: ${({
    theme: {
      spacings: { s3, s4 },
    },
  }) => `${s3} ${s4} ${s3} ${s4}`};
`

const loadingAnimation = keyframes`
  from { opacity: .6 }
  to { opacity: 1 }
`

export const useLoadingAnimation = () => css`
  animation: ${loadingAnimation} 1s infinite alternate ease-in-out;
`
