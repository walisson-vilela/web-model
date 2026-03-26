import styled from 'styled-components'

export const SignatureCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const SignatureColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px 24px;
  align-items: flex-start;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: #4b5563;
  gap: 4px;
`

export const ColumnTitle = styled.span`
  font-size: 13px;
  color: #6b7280;
`

export const ColumnValue = styled.span`
  font-size: 13px;
`

export const ValueGray = styled.span`
  font-size: 13px;
  color: #6b7280;
`

export const ValueBold = styled.span`
  font-size: 13px;
  color: #111827;
  font-weight: 600;
`

export const ContractButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`

export const EpisSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const EpisToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  padding: 0;
  color: #111827;
  font-weight: 600;
  cursor: pointer;
`

export const EpisCount = styled.span`
  color: #111827;
`

export const EpisContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto) minmax(120px, auto);
  gap: 8px 24px;
  align-items: flex-start;
`

export const EpisList = styled.div`
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 4px 24px;
  justify-content: flex-start;
`

export const EpiItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #1f2937;
  justify-content: flex-start;

  &::before {
    content: '•';
    color: #1f2937;
  }
`

export const QuantityPill = styled.span`
  background: #f3f4f6;
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #111827;
`

export const PartialBadge = styled.span`
  background: rgba(248, 113, 113, 0.12);
  color: #dc2626;
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
`

export const PartialBadgeColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  ${PartialBadge} {
    margin-top: 8px;
  }
`
