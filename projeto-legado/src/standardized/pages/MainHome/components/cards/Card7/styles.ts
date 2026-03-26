import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  width: 100%;
`

export const ChartWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  height: clamp(140px, 30vw, 170px);
  padding: 10px 16px 10px 10px;
  margin: 0 auto;

  .highcharts-container {
    width: 100% !important;
    height: 100% !important;
  }

  .highcharts-plot-line {
    stroke-dasharray: 4px;
  }
`

export const Columns = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: ${({ theme }) => theme.spacings.s3};
`

export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};
`

export const ColumnTitle = styled.span`
  font-size: 14px;
  color: #4b5563;
`

export const ColumnValue = styled.span<{ $color: string }>`
  font-size: 24px;
  font-weight: 700;
  color: ${({ $color }) => $color};
`

export const ColumnDetail = styled.span`
  font-size: 13px;
  color: #6b7280;
`

export const Divider = styled.div`
  width: 1px;
  background: #e5e7eb;
`
