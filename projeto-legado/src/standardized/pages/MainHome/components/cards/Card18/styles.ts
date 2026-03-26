import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.spacings.s2}
    ${({ theme }) => theme.spacings.s3};
`

export const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacings.s1};
`

export const MonthLabel = styled.span`
  font-size: 13px;
  color: #6b7280;
`

export const TotalValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
`

export const Divider = styled.div`
  width: 1px;
  background: #e5e7eb;
  margin: 0 ${({ theme }) => theme.spacings.s3};
`

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacings.s1};
  font-size: 13px;
  color: #4b5563;
`

export const InfoRow = styled.span`
  font-size: 13px;
  color: #4b5563;
`
