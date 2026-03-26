import { MwCalendar } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 13px;
  width: 100%;
`

interface SelectProps {
  isDisabled: boolean
}

export const Select = styled.div<SelectProps>`
  flex: 1;
  gap: 7px;
  display: flex;
  flex-direction: column;

  opacity: ${(props) => (props.isDisabled ? '0.6' : '1')};

  & > div {
    min-width: 0 !important;
    min-height: 35px !important;
    line-height: 0.8em !important;
    border: 1px solid #c8c8c8 !important;
  }
  & > .ui.selection.dropdown .menu > .item {
    padding: 0 !important;
  }

  & > .ui.disabled.dropdown,
  .ui.dropdown .menu > .disabled.item {
    opacity: 1 !important;
  }
`
export const CalendarComponent = styled(MwCalendar)`
  top: 0 !important;
  max-height: 1000px;
  position: relative;
`
export const CalendarContainer = styled.div`
  position: relative;

  & > div {
    padding: 7px;
  }
`

export const SelectDate = styled.div`
  height: 379px;
  width: 244px;
  position: relative;

  & > div {
    padding: 7px;
  }
`

export const Option = styled.div`
  padding: 0.78571429rem 1.14285714rem;
`
