import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

export const Card = styled.article`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
  padding: 14px 14px 14px 0px;
`

export const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`

export const Chevron = styled(Icon)<{ $expanded: boolean }>`
  color: #6b7280 !important;
  transition: transform 0.2s ease, color 0.2s ease;
  transform: ${({ $expanded }) => ($expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`

export const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;

  cursor: pointer;


  &:hover ${Chevron} {
    color: #111827 !important;
  }
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    border: none;
  }
`

export const OverviewColumns = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 2fr) minmax(220px, 2fr) repeat(
      3,
      minmax(110px, 1fr)
    );
  gap: 12px 24px;
  align-items: flex-start;
  padding: 0px 28px 28px 28px;
`

export const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: #4b5563;
`

export const TextStrong = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #111827;
`

export const TextMuted = styled.span`
  font-size: 13px;
  color: #6b7280;
`

export const KpiColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
`

export const KpiValue = styled.strong`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
`

export const KpiLabel = styled.span`
  font-size: 12px;
  color: #6b7280;
`

export const Expanded = styled.div`
  padding: 16px 28px 0px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const TabsHeader = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #e5e7eb;
`

export const TabButton = styled.button<{ $active?: boolean }>`
  border: none;
  background: ${({ $active }) => ($active ? '#edf2ff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#1d4ed8' : '#374151')};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  padding: 10px 18px;
  border-radius: 8px 8px 0 0;
  border-bottom: 2px solid ${({ $active }) => ($active ? '#1d4ed8' : 'transparent')};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ $active }) => ($active ? '#e0e7ff' : '#f9fafb')};
  }
`

export const TabsContent = styled.div`
  padding: 16px 0 0;
`
