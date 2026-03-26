import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
`

export const Subtitle = styled.span`
  font-size: 13px;
  color: #4b5563;
`

export const ChartWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px 0;

  .highcharts-root {
    margin: 0 auto !important;
  }

  .highcharts-container {
    width: 100% !important;
    height: 100% !important;
  }
`
