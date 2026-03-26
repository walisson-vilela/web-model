import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`

export const Title = styled.h3`
  font-size: 16px;
  margin: 0;
  color: #111827;
  font-weight: 600;

  span {
    color: #6b7280;
    font-weight: 500;
  }
`

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 14px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 8px;
`

export const EmptyState = styled.div`
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
`

export const HelperText = styled.span`
  font-size: 13px;
  color: #6b7280;
`

export const LoadingState = styled.div`
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  padding: 40px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoaderInline = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  color: #6b7280;

  > div {
    width: 24px;
    height: 24px;
  }
`
