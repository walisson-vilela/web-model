import styled from 'styled-components'

export const Reload = styled.button`
  svg {
    max-width: 14px;
    max-height: 14px;
  }

  svg,
  svg * {
    stroke: #999999;
  }
`

export const ResetPosition = styled.button`
  svg {
    max-width: 18px;
    max-height: 18px;
  }

  svg,
  svg * {
    stroke: #999999;
    fill: #999999;
    stroke-width: 0.25px;
  }
`

export const CollapseExpand = styled.button`
  svg {
    max-width: 18px;
    max-height: 18px;
  }

  svg,
  svg * {
    stroke: #999999;
    fill: #999999;
  }

  &.active svg {
    rotate: 180deg;
  }

  svg {
    transition: rotate linear 0.25s;
  }
`

export const CollapseNeighbor = styled.button`
  svg {
    max-width: 18px;
    max-height: 18px;
  }

  svg,
  svg * {
    stroke-width: 0.5px;
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.blue};
    svg,
    svg * {
      stroke: ${({ theme }) => theme.colors.white};
    }
    svg {
      g {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  }

  &:not(.active) {
    background-color: ${({ theme }) => theme.colors.white};
    svg,
    svg * {
      stroke: #999999;
    }
    svg g {
      fill: #999999;
    }
  }

  transition-property: background-color;
  transition-timing-function: linear;
  transition-duration: 0.25s;
`

export const TreeActionsWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: grid;
  box-shadow: 0px 3px 6px #00000029;

  button {
    cursor: pointer;
    width: 39px;
    aspect-ratio: 1;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid #eeeeee;
    display: grid;
    place-items: Center;

    svg,
    svg * {
      transition-property: fill stroke;
      transition-timing-function: linear;
      transition-duration: 0.25s;
    }

    &:disabled {
      opacity: 0.7;
      cursor: auto;
    }

    &:first-child {
      border-radius: 5px 5px 0 0;
    }

    &:last-child {
      border-radius: 0 0 5px 5px;
    }
  }
`
