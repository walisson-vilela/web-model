import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
`

export const ChartWrapper = styled.div`
  flex: 1;
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
  }
`

export const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 21px;
  font-size: 13px;
  color: #263046;
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
