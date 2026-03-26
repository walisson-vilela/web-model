import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`

export const PrintButton = styled.button`
  border: none;
  background: transparent;
  padding: 4px;
  cursor: pointer;
  color: #9ca3af;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const EpiContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const EpiName = styled.strong`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`

export const SizesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const SizeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #111827;
  max-width: 260px;
`

export const SizeLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 16px;
    right: 64px;
    top: 50%;
    border-bottom: 1px dotted #e5e7eb;
    transform: translateY(0);
    pointer-events: none;
  }
`

export const Bullet = styled.span`
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #111827;
`

export const SizeLabel = styled.span`
  position: relative;
  z-index: 1;
`

export const QuantityPill = styled.span`
  background: #f3f4f6;
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #111827;
  min-width: 32px;
  text-align: center;
`

export const Separator = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 0;
`
