import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) => theme.spacings.s2}
    ${({ theme }) => theme.spacings.s3};
`

export const Columns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacings.s3};
`

export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacings.s1};
  text-align: center;
`

export const MainValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
`

export const Label = styled.span`
  font-size: 13px;
  color: #6b7280;
`

export const Divider = styled.div`
  width: 1px;
  align-self: stretch;
  background: #e5e7eb;
`

export const ReachWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ReachHeader = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};
`

export const CaretButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

export const Caret = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;

  span {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #9ca3af;
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.2s ease;
  }
`

export const LegendTooltip = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #1f2637;
  color: #ffffff;
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacings.s2};
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.25);
  min-width: 260px;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 18px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #1f2637;
  }
`

export const LegendTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacings.s2};
`

export const LegendHeader = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  column-gap: ${({ theme }) => theme.spacings.s2};
  font-size: 12px;
  color: #d1d5db;
  margin-bottom: ${({ theme }) => theme.spacings.s1};

  span:first-child {
    visibility: hidden;
  }
`

export const LegendList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};

  li {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    column-gap: ${({ theme }) => theme.spacings.s2};
    font-size: 13px;
    color: #e5e7eb;
  }

  strong {
    font-weight: 600;
  }
`
