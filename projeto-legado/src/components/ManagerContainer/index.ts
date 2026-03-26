import styled from 'styled-components'

const MwManagerContainer = styled.div`
  flex: 1;
  /* overflow-y: hidden; */
  display: flex;
  flex-direction: column;
  height: 100%;

  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`
export default MwManagerContainer
