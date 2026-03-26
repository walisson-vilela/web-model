import styled from 'styled-components'

export const Container = styled.div`
  overflow-x: hidden;
  .ui.grid.dashboard {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`
export const Header = styled.div`
  padding: 16px 0 8px 0;
  margin-bottom: 32px;
  background: #ffffff 0% 0% no-repeat padding-box;
  opacity: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ebebeb;
`

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;

  h1 {
    text-align: left;
    font: normal normal bold 18px/22px 'Lato';
    letter-spacing: 0px;
    color: #192338;
    opacity: 1;
    margin-bottom: 0;
  }

  span {
    display: inline-block;
    margin: 8px 0;
    position: relative;
    font: normal normal normal 16px 'Lato';
    letter-spacing: 0px;
    color: #263046b3;
    opacity: 1;
  }
`

export const Menu = styled.div.attrs({
  className: 'hide-on-print',
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 12px;
`
export const FilterArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const ApplyFilterItem = styled.div`
  position: relative;
  width: 180px;
`

export const FilterItem = styled.div`
  position: relative;
  width: 140px;
  border-left: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`
