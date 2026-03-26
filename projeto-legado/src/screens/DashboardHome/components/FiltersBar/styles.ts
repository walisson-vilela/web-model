import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  padding: 28px 0 14px;
`

export const SelectWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
`

export const AreaWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
`

export const AreaDisplay = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 26px;

  > span {
    font-weight: 600;
    color: #111827;
  }

`

export const VisionWrapper = styled.div`
  position: relative;
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #4b5563;
  cursor: pointer;
`

export const Select = styled.select`
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  padding: 7px 7px 7px 0;
  border-bottom: 1px solid transparent;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-bottom-color: #a855f7;
  }
`

export const LevelWrapper = styled.div`
  position: relative;
`

export const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 0;
  background: transparent;
  border: none;
  font-size: 14px;
  color: #111827;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

export const TriggerValue = styled.span`
  font-weight: 600;
  color: #111827;
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

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 7px;
  min-width: 154px;

  &[data-active='true'] {
    font-weight: 600;
    color: #111827;
  }
`

export const HiddenSelect = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  background: #fff;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
  border-radius: 12px;
  padding: 14px;
  z-index: 10;
`

export const RightFilters = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 14px;
`

export const DateWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
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
    padding: 14px;
    pointer-events: auto;
  }
`

export const MoreWrapper = styled.div`
  position: relative;
`
