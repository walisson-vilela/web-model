import styled from 'styled-components'

export const Page = styled.section`
  display: flex;
  flex-direction: column;
  gap: 21px;
  padding: 0 28px 28px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

export const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background: #ffffff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  width: calc(100%);

  margin-right: 0;
  padding-left: 28px;
  padding-right: 28px;
  box-sizing: border-box;
  margin-bottom: 18px;
`

export const HeaderToolbarContainer = styled.div`
  display: flex;
  margin-bottom: 0 !important;
  font-size: 14px !important;
  font-weight: inherit !important;
  color: #999999 !important;
`

export const HeaderToolbarCell = styled.div`
  border-style: solid;
  border-color: #e2e2e3;
  border-width: 0 0 0 1px;
  padding: 13px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #263046;

  strong {
    font-size: 16px;
    font-weight: 600;
  }
`

export const ListHeaderLeft = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`

export const SortArea = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #999999;
  font-size: 14px;
  white-space: nowrap;
`

export const SortDropdown = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`

export const SortLabel = styled.span``

export const SortValue = styled.span`
  color: #4b5563;
`

export const SortButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: inherit;
`

export const SortCaret = styled.span`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid currentColor;
  margin-left: 2px;
`

export const SortMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.12);
  padding: 8px 0;
  min-width: 220px;
  z-index: 20;

  display: flex;
  flex-direction: column;
`

export const SortMenuItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  padding: 10px 16px;
  cursor: pointer;
  color: #263046;
  font-size: 14px;
  white-space: nowrap;

  &:hover { background: #f3f4f6; }
`

export const SortInfoButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0.5px solid #e5e7eb;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  color: #4b5563;
`

export const InfoPopupTitle = styled.h4`
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 600;
`

export const InfoLegend = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 18px;
  align-items: start;
`

export const Caret = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  color: #4b5563;
`

export const CardsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 21px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const ItemCard = styled.section<{ $accentColor?: string }>`
  position: relative;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  border-left: 6px solid ${({ $accentColor }) => $accentColor ?? '#19c172'};
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.12);
  padding: 14px 14px 10px;
`

export const ItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  padding: 0 14px;
`

export const ItemActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    color: #4b5563;
  }
`

export const ItemTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #263046;
`

export const ItemPeriod = styled.div`
  margin-top: 4px;
  font-size: 13px;
  color: #4b5563;
`

export const ItemMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px;
  gap: 14px;
  padding: 10px 14px 0;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const Bars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const BarRow = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 10px;
  align-items: center;
`

export const BarLabel = styled.span`
  font-size: 12px;
  color: #4b5563;
`

export const BarTrack = styled.div`
  height: 10px;
  background: #e5e7eb;
  border-radius: 5px;
  overflow: hidden;
`

export const BarFill = styled.div<{ $value: number; $color: 'muted' | 'blue' | 'purple' }>`
  height: 100%;
  width: ${({ $value }) => Math.max(0, Math.min(100, $value))}%;
  background: ${({ $color }) =>
    $color === 'purple' ? '#a855f7' : $color === 'blue' ? '#3b82f6' : '#9ca3af'};
`

export const BarAxis = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #4b5563;
  padding-left: 34px;
`

export const Week = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 2px;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`

export const WeekValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #263046;
  line-height: 1;
`

export const WeekLabel = styled.div`
  font-size: 13px;
  color: #4b5563;
`

export const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  padding: 10px 14px 0;
  margin-top: 10px;
  border-top: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const DetailsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const DetailLine = styled.div`
  font-size: 13px;
  color: #4b5563;

  strong {
    color: #263046;
    font-weight: 600;
  }
`

export const Status = styled.span<{ $dotColor?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $dotColor }) => $dotColor ?? '#19c172'};
  }
`

export const Days = styled.div`
  font-size: 12px;
  color: #4b5563;
  letter-spacing: 0.35em;
  text-decoration: underline;
  text-underline-offset: 3px;
  margin-top: 2px;
`

export const Impact = styled.div`
  padding: 10px 14px 0;
  margin-top: 10px;
  border-top: 1px solid #e5e7eb;
`

export const ImpactTitle = styled.div`
  font-size: 13px;
  color: #4b5563;
  margin-bottom: 10px;
`

export const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 10px;
  }
`

export const ImpactItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 7px;

  strong {
    font-size: 14px;
    color: #263046;
    font-weight: 700;
  }

  span {
    font-size: 13px;
    color: #4b5563;
  }

  &:not(:first-child) {
    border-left: 1px solid #e5e7eb;
  }
`
