import styled from 'styled-components'

export const LoaderColumn = styled.td`
  padding: 0;
`

export const LoaderContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;

  height: 100%;

  z-index: 98;

  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`
