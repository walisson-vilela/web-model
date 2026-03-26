import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

export const InputContainer = styled.div`
  position: relative;

  .ui.fluid.input.input-text input {
    color: #263046;
    &:focus {
      border-color: #c8c8c8;
    }
  }
`

export const ArrowsContainer = styled.div`
  position: absolute;
  top: calc(50% - 10px);
  right: 7px;
`

export const Arrow = styled(Button)`
  &.ui.button {
    margin: 0;
    padding: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    min-height: unset;
    padding: 2px 4px;
    cursor: unset;
    color: #6d6d7a !important;

    background-color: #e9e9ed;

    :focus {
      background-color: #e9e9ed;
    }

    :hover {
      background-color: #d0d0d7;
    }

    > i.icon,
    i.icon:not(.button) {
      margin: 0 !important;
      --size: 12px;
      font-size: var(--size);
      width: var(--size);
      height: 6px;

      :before {
        display: block;
        font-size: var(--size);
        width: var(--size);
        height: 6px;
        margin-top: -3px;
      }
    }
  }
`
