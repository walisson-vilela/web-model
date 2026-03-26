import styled from 'styled-components'

export const Cell = styled.div`
  position: relative;
  box-sizing: border-box;

  background-color: #fff !important;
  border-style: solid;
  border-color: #e2e2e3;

  font-size: 14px;
  line-height: 17px;
`

export const Container = styled.div<{ $borderless?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: #fff !important;
  border-width: ${({ $borderless: borderless }) => (borderless ? '0' : '0 0 1px 0')};
  border-style: solid;
  border-color: #e2e2e3;
  color: #999999;

  & > div {
    display: flex;
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }
`
export const FirstContainer = styled.div`
  background-color: #fff !important;

  ${Cell} {
    border-width: 0 1px 0 0;
    padding: 0 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
    ${Cell}:last-child {
      border-width: 0 0 0 0;
    }
  }
`

export const SecondContainer = styled.div`
  background-color: #fff !important;

  ${Cell} {
    border-width: 0 0 0 1px;
    padding: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;

    ${Cell}:first-child {
      border-width: 0 0 0 0;
    }
  }
`
