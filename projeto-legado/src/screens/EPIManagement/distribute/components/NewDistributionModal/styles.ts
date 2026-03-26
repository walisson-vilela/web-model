import styled from 'styled-components'

export const Container = styled.div`
  min-height: 360px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`


export const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: #4b5563;
`

export const Stepper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

export const StepCircle = styled.span<{ $active?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: 1px solid ${({ $active }) => ($active ? '#1d4ed8' : '#d1d5db')};
  background: ${({ $active }) => ($active ? '#1d4ed8' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#1f2937')};
`

export const StepLine = styled.div`
  height: 1px;
  width: 40px;
  background: #d1d5db;
`

export const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
`

export const ColumnCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const ColumnHeader = styled.div`
  padding: 12px 16px;
  font-weight: 600;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
`

export const ColumnContent = styled.div`
  padding: 16px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const PlaceholderContent = styled.div`
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  padding: 24px;
  color: #6b7280;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
`
