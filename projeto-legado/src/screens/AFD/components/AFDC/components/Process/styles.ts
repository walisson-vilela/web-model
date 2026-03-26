import { Dropdown, Popup as SemanticPopup } from 'semantic-ui-react'
import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  position: relative;
  gap: 22px;
  align-items: flex-end;

  label {
    width: 188px;

    span {
      font-size: 14px;
      font-weight: normal;
      padding-bottom: 7px;
      display: block;
      font-family: Lato;
    }
  }
`

export const Popup = styled(SemanticPopup)`
  padding: 0 !important;

  .rdrStartEdge,
  .rdrEndEdge {
    color: #3455ab !important;
  }

  .rdrInRange {
    color: #3455ab4d !important;
  }

  .rdrDay span {
    border-radius: 0 !important;
  }

  .rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span,
  .rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span,
  .rdrDay:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span {
    color: #ffffff !important;
  }

  .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span {
    color: #000000 !important;
  }

  .rdrDayNumber {
    font-weight: normal !important;
  }
`

export const DropdownMenu = styled.div<{ active: boolean }>`
  position: absolute;
  display: ${({ active }) => (active ? 'block' : 'none')};
  top: 63px;
  z-index: 999;

  > div {
    width: 188px !important;
  }
`

export const DropdownItem = styled(Dropdown.Item)`
  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.03) !important;
  }
`

export const RangeFooter = styled.div`
  padding: 0 7px 7px 7px;
  display: flex;
  justify-content: flex-end;
`

export const DropdownButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  height: 35px;
  width: 100%;
  background-color: white;
  border: 1px solid #c8c8c8;
  border-radius: 4px;
  padding: 7px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  span {
    color: rgba(25, 35, 56, 0.5);
    padding-bottom: 0 !important;
  }
`
