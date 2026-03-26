import styled, { css } from 'styled-components'

import { TransparentButton } from '../../../styled'
import type { Position } from '../interfaces'

interface ItemProps {
  $tone?: 'default' | 'danger'
}

interface ContainerProps {
  /** indicador de dropdown aberto */
  $open?: boolean
  /** posicao que o dropdown deve abrir */
  $position?: Position
}

const positions = {
  'top left': css`
    right: 0;
    bottom: 100%;
  `,

  'top right': css`
    left: 0;
    bottom: 100%;
  `,

  'left top': css`
    right: 100%;
    bottom: 0;
  `,

  'left bottom': css`
    right: 100%;
    top: 0;
  `,

  'bottom left': css`
    right: 0;
    top: 100%;
  `,

  'bottom right': css`
    left: 0;
    top: 100%;
  `,

  'right top': css`
    left: 100%;
    bottom: 0;
  `,

  'right bottom': css`
    left: 100%;
    top: 0;
  `,
}

export const SubContainer = styled.div`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(34, 36, 38, 0.15);
  padding: 7px 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  transition-property: max-height, opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
`

export const Container = styled.div<ContainerProps>`
  position: absolute;
  z-index: 2;
  background-color: #fff;
  width: max-content;

  transition-property: max-height, opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;

  box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15) !important;

  ${({ $open: open }) => {
    const [maxHeight, opacity] = open ? ['500px', '1'] : ['0px', '0']

    return css`
      opacity: ${opacity};
      max-height: ${maxHeight};

      ${SubContainer} {
        opacity: ${opacity};
        max-height: ${maxHeight};
      }
    `
  }};

  overflow: hidden;

  ${({ $position: position }) => position && positions[position]}
`

export const Item = styled(TransparentButton)<ItemProps>`
  padding: 7px 14px;
  color: ${({ $tone }: ItemProps) =>
    $tone === 'danger' ? '#db2828' : '#222426'};
`

export const ItemWrapper = styled.div`
  width: 100%;
`

export const Line = styled.hr`
  margin: 7px 0;
  border-style: solid;
  border-color: #dadadb;
  border-width: 1px 0 0 0;
`
