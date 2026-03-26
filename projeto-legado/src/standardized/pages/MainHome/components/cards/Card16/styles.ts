import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  gap: ${({ theme }) => theme.spacings.s2};
  padding: ${({ theme }) => theme.spacings.s2}
    ${({ theme }) => theme.spacings.s3};
`

export const PeriodSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
`

export const PeriodLabel = styled.span`
  font-size: 13px;
  color: #6b7280;
`

export const RangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
`

export const PeriodLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
`

export const PeriodLabelItem = styled.span<{ $active: boolean }>`
  min-width: 0;
  white-space: nowrap;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? '#111827' : '#6b7280')};
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
  height: 120px;

  .highcharts-container {
    width: 100% !important;
    height: 100% !important;
  }
`

export const DetailsHeader = styled.div`
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
`

export const DetailsListWrapper = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.spacings.s1};
`

export const DetailsList = styled.ul`
  margin: 0;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};

  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: ${({ theme }) => theme.spacings.s1};
    font-size: 13px;
    color: #4b5563;
  }

  li::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: #111827;
    flex: 0 0 auto;
  }

  li span:first-child {
    min-width: 0;
  }
`

export const DetailCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #f3f4f6;
  padding: 1px 14px;
  font-size: 11px;
  font-weight: 700;
  color: #111827;
  flex: 0 0 auto;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
  margin-left: ${({ theme }) => theme.spacings.s2};
`
