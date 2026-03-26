import styled from 'styled-components'

export const BodyText = styled.p`
  margin: 0 0 24px;
  color: #192338;
  font-size: 16px;
`

export const Layout = styled.div`
  display: flex;
  gap: 32px;
`

export const Column = styled.div`
  flex: 1;
  min-width: 0;
`

export const SummaryRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`

export const AllowText = styled.p`
  margin: 0 0 16px;
  font-size: 12px;
  color: #6b7280;
`

export const CurrentDistributor = styled.div`
  margin-bottom: 16px;
  font-size: 13px;
  color: #111827;
`

export const Divider = styled.div`
  width: 1px;
  background-color: #e5e7eb;
`

export const HistoryContainer = styled.div`
  max-height: 280px;
  overflow-y: auto;
`

export const DropdownTrigger = styled.div`
  position: relative;
  border: 1px solid #d9d9d9;
  padding: 10px 40px 10px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 38px;
  font-size: 13px;
`

export const DropdownTriggerText = styled.span<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? '#000' : '#888')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`

export const DropdownOptions = styled.div`
  max-height: 240px;
  overflow-y: auto;
`

export const DropdownOption = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 12px;
  border-top: 1px solid #f2f2f2;
  background: ${({ $selected }) => ($selected ? '#f5f5f5' : 'transparent')};
  font-size: 13px;
`

export const DropdownSearchWrapper = styled.div`
  padding: 8px 12px;

  input {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 6px 8px;
  }
`
