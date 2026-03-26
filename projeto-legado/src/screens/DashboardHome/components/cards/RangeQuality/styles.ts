import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
`

export const SubHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #4b5563;
`

export const BackButton = styled.button`
  border: none;
  background: #6b4eff;
  color: #ffffff;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #5a3fe0;
  }
`

export const ChartWrapper = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 28px;

  .highcharts-root {
    margin: 0 auto;
  }

  .highcharts-container {
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
`

export const Legend = styled.div<{ $hidden?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 21px;
  font-size: 13px;
  color: #263046;
  min-height: 28px;
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
`

export const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;

  span {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    display: inline-block;
  }
`
