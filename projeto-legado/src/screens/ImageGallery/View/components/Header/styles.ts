import styled from 'styled-components'

export const Container = styled.div`
  width: calc(100% - 112px);
  position: fixed;
  background: #fcfcfc;
  z-index: 1;

  & > div {
    margin-bottom: 0;
  }
`
export const FiltersContainer = styled.div`
  margin: 0 !important;
  border-left: none;
  display: flex;
  align-items: center;
  position: relative;

  > *:nth-child(n + 2) {
    padding: 0 16px;
    border-left: 1px solid #e2e2e3;
    height: 39px;
    display: flex;
    align-items: center;
  }

  svg {
    border-left: none;
  }

  .wrapper-button {
    display: flex !important;
    align-items: center !important;
  }
`

export const ExibitionMode = styled.div`
  padding-right: 16px !important;
  position: relative !important;
  i:before {
    color: #999999 !important;
  }
  span {
    font: normal normal normal 14px/16px Lato;
    letter-spacing: 0px;
    color: #999999;
  }
`

export const DropDown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-right: 14px;
  position: relative;
  margin: 0;

  span {
    font: normal normal normal 14px/16px Lato;
    letter-spacing: 0px;
    color: #999999;
    opacity: 1;
    padding-right: 14px;
  }
  .arrow-down {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #b2b2b2;
  }
`

export const Options = styled.div`
  width: 180px;
  height: 63px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 14px;

  position: absolute;
  top: 30px;
  left: 20px;
  z-index: 9999;

  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #c8c8c8;
  border-radius: 4px;
  opacity: 1;
`

interface GridColumns {
  current?: boolean
}

export const Grid = styled.div<GridColumns>`
  width: 22px;
  height: 22px;
  flex: 1;
  border-radius: 4px;
  display: grid;
  strong {
    width: 100%;
    height: 100%;
    background: red;
  }
  //grid-template-columns: repeat(3, 1fr);
  .grid-item {
    border: 1px solid #c8c8c8;
    flex: 1;
    padding: 4px;
  }
`

export const Grid2 = styled(Grid)`
  grid-template-columns: repeat(2, 1fr);
  .grid-item {
    border: 1px solid #c8c8c8;
    flex: 1;
    padding: 4px;
  }
`
export const Loader = styled.div`
  svg {
    cursor: pointer;
  }
`

export const ShowContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    cursor: pointer;
  }
`
