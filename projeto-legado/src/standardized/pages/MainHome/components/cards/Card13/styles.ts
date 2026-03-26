import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.spacings.s1};
  padding: ${({ theme }) => theme.spacings.s2}
    ${({ theme }) => theme.spacings.s3};
`

export const Subtitle = styled.span`
  font-size: 13px;
  color: #6b7280;
`

export const ChartWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ChartContainer = styled.div`
  width: 100%;
  max-width: 420px;
  height: 200px;

  .highcharts-container {
    width: 100% !important;
    height: 100% !important;
  }
`
