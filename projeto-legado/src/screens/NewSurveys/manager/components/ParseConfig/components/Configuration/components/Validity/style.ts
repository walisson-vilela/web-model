import { MwCalendar } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 13px;
  z-index: 999;
  width: 100%;
`
export const Select = styled.div`
  flex: 1;
  gap: 9px;
  display: flex;
  flex-direction: column;
  & > div {
    min-width: 0 !important;
  }
  & > .ui.selection.dropdown .menu > .item {
    padding: 0 !important;
  }
`
export const CalendarComponent = styled(MwCalendar)`
  top: 0 !important;
  max-height: 1000px;
`
export const CalendarContainer = styled.div``
export const Option = styled.div`
  padding: 0.78571429rem 1.14285714rem;
`
