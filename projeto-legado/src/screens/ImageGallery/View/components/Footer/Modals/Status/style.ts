import styled from 'styled-components'

export const ModalText = styled.div`
  color: #263046;
  text-align: left;
`

export const LoaderContainer = styled.div`
  width: 100%;
  height: 39px;

  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;

  div:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`
