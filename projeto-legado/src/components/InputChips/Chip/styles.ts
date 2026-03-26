import styled, { css } from 'styled-components'

import { ChipProps } from './interfaces'

export const Content = styled.p`
  display: inline-block;
  padding: 1.75px;
  margin: 0;
`

export const Button = styled.div`
  height: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 3.5px;
`

export const Chip = styled.div<Partial<ChipProps>>`
  border: 1px solid rgba(112, 112, 112, 0.33);
  display: flex;
  align-items: center;
  align-content: flex-start;
  padding: 0 1.75px;
  margin: 1.75px;
  cursor: default;

  ${({ haveError }) =>
    haveError &&
    css`
      border-color: #e23851;

      ${Content} {
        text-decoration-line: underline;
        text-decoration-style: dotted;
        text-decoration-color: #e23851;
      }

      ${Content}, ${Button} {
        color: #e23851;
      }
    `};
`
