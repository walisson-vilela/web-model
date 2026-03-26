import { CardDescription, Menu as SemanticMenu } from 'semantic-ui-react'
import styled from 'styled-components'

export const WidgetHeaderWrapper = styled(CardDescription)`
  .transform > i {
    transform: rotate(50deg);
  }

  .header {
    font-size: 15px !important;
    width: 0 !important;
    flex-grow: 1 !important;
    margin-left: 0 !important;
    padding-right: 0 !important;

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .performance-title {
    flex: 1;
    span {
      display: inline-block !important;
      width: 100% !important;
      margin-left: 73px !important;
    }
  }

  .icon.item {
    color: var(--new-gray-light) !important;
  }

  .subTitle {
    padding-left: 16px;
    color: #6b7686;
    font-size: 13px;
  }
`

export const Menu = styled(SemanticMenu)`
  width: 100%;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;

  svg {
    cursor: pointer !important;
  }

  .menu-options {
    margin: 0 !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
  }

  .item-svg {
    width: 30px !important;
    height: 30px !important;
    margin: 0 !important;
    padding: 0 !important;
  }
`

interface HeaderDirection {
  direction: boolean
}

export const MenuOptions = styled.div<HeaderDirection>`
  width: 74px;
  display: flex;
  flex-direction: row;
  align-items: center !important;
  justify-content: ${(props) =>
    props.direction ? 'space-between' : 'flex-end'};

  .item-link {
    margin: 0 !important;
    position: relative !important;
    right: 8px !important;
  }
`

export const IconContainer = styled.button`
  width: 29px;
  height: 22px;
  background-color: #3455ab;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: 0;
  margin-right: 16px;
`
