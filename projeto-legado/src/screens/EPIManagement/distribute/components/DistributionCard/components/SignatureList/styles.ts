import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const ToolbarWrapper = styled.div`
  padding-bottom: 8px;

  & > div > div {
    border: none !important;
  }

  & > div > div > div {
    border: none !important;
  }
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 420px;
  overflow-y: auto;
  padding-right: 8px;
`

export const Separator = styled.div`
  border-top: 1px dashed #d1d5db;
  width: 100%;
`

export const EmptyState = styled.div`
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
`
