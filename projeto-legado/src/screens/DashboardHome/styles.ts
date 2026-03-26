import styled from 'styled-components'

export const Page = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const FiltersSection = styled.div`
  padding: 0 28px;
`

export const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 0 0 14px;
`

export const CardsArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 28px 28px;
`

export const CardsRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 21px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const RowColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  height: 100%;

  > :only-child {
    height: 100%;
  }
`

export const StackedColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  height: 100%;
`

export const CardMetric = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 14px;
    color: #263046;
    font-weight: 600;
  }

  span {
    font-size: 13px;
    color: #4b5563;
  }
`

export const CardLine = styled.p<{ $color?: string }>`
  margin: 0;
  font-size: 13px;
  color: ${({ $color }) => $color || '#4b5563'};
`

export const CardFooterRow = styled.div<{ $accent?: string; $align?: 'left' | 'right' }>`
  display: flex;
  justify-content: ${({ $align }) => ($align === 'right' ? 'flex-end' : 'space-between')};
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: #4b5563;
`

export const CardFooterValue = styled.span<{ $accent?: string }>`
  font-weight: 600;
  color: ${({ $accent }) => $accent || '#263046'};
`

export const CardFooterSplit = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  font-size: 13px;
  color: #4b5563;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;
  }
`

export const CardFooterSplitItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
`
