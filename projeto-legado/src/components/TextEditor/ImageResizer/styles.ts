import styled, { css } from 'styled-components'

import { Position } from './types'

export const Container = styled.div<{
  position: Position
}>`
  position: fixed;

  ${({ position }) =>
    Object.keys(position).map(
      (pos) => css`
        ${pos}: ${position[pos]}%;
      `,
    )}

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  justify-content: center;
  align-items: center;

  text-align: center;

  padding: ${({ theme }) => theme.spacings.s1};
  box-shadow: 0px 3px 6px ${({ theme }) => theme.getColor('black', 15)};
  border: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  background-color: ${({ theme }) => theme.colors.white};

  > div {
    max-width: 255px;

    :nth-child(2),
    :nth-child(3) {
      display: flex;
      gap: ${({ theme }) => theme.spacings.s1};
      justify-content: center;
      align-items: center;

      > button {
        :disabled {
          color: ${({ theme }) => theme.colors.blue};
          opacity: unset;
        }
      }

      > input {
        width: 50%;

        ${({ theme }) => theme.useTypography('p')};

        line-height: 17px;

        padding: ${({
          theme: {
            spacings: { s2, s3 },
          },
        }) => `${s2} ${s3}`};
        border-width: 1px;
        border-style: solid;
        border-color: ${({ theme }) => theme.colors.lightGrey};
        border-radius: 4px;

        background-color: ${({ theme }) => theme.colors.white};
        /** google chrome blue background */
        -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.white}
          inset !important;

        box-shadow: none;
        outline: none;

        /* Chrome, Safari, Edge, Opera */
        :-webkit-outer-spin-button,
        :-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        -moz-appearance: textfield;
      }
    }
  }
`
