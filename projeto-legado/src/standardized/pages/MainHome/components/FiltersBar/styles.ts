import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.spacings.s3} 0;
  border-bottom: 1px solid #d6d6d6;
  gap: ${({ theme }) => theme.spacings.s2};
  z-index: 20;
`

export const LeftFilters = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s3};
  flex-wrap: wrap;
`

export const RightFilters = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s3};
  flex-wrap: wrap;
`

export const FilterWrapper = styled.div`
  position: relative;
  display: flex;
  z-index: 2;
`

export const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};
  padding: ${({ theme }) => theme.spacings.s1} 0;
  background: transparent;
  border: none;
  font-size: 14px;
  color: #111827;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

export const Label = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #263046B3;
`

export const Value = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #263046B3;
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

export const SelectOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  margin-left: 45px;
  width: 150px;

  > div{
    > label{
      opacity: 0;
    }
  }
`

export const MultSelectOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  margin-left: 45px;
  width: 350px;
  z-index: 30;

  > div{
    > label{
      opacity: 0;
    }
  }
`

export const LevelOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  span:first-child {
    font-weight: 600;
    color: #111827;
  }

  span:last-child {
    font-size: 12px;
    color: #6b7280;
  }
`

export const DateWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`

export const CalendarContainer = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 7px);
  z-index: 25;
  pointer-events: none;

  > * {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
    padding: ${({ theme }) => theme.spacings.s2};
    pointer-events: auto;
  }
`

export const MoreWrapper = styled.div`
  position: relative;
`
