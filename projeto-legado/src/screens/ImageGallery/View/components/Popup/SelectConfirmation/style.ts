import styled from 'styled-components'

export const Container = styled.div`
  width: 305px;
  height: 314px;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  width: 100%;
  padding: 14px 21px 7px 21px;
`
export const Header = styled.div`
  width: 100%;
  padding: 0 21px 14px 21px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  & div {
    width: 100%;
  }

  .ui.icon.input > i.icon:not(.link) {
    top: -5px !important;
  }
`

export const Content = styled.div`
  width: 100%;
  height: 164px;
  position: relative;
  flex: 1;
`

export const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  height: 100%;
  z-index: 99;
`

export const Footer = styled.div`
  border-top: 1px solid #dadadb;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 14px 21px 14px 21px;
  gap: 7px;
`

export const List = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  padding: 0 21px 14px 21px;
`
