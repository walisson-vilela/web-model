import styled, { css } from 'styled-components'

import { Link } from '../../styled'

export { Link, Title } from '../../styled'

export const LabelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${({ theme }) => theme.spacings.s1};
  padding: ${({ theme }) => theme.spacings.s1};

  ${Link} {
    display: flex;
    gap: calc(${({ theme }) => theme.spacings.s1} / 2);
    align-items: center;
  }
`

export const ImagesContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  flex: 1;
  flex-direction: column;
`

export const Image = styled.div<{ src: string; label: string }>`
  width: 100%;
  height: auto;
  max-height: 100%;

  background-image: url(${({ src }) => src});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  position: relative;

  ${({ onClick, label, theme }) =>
    onClick &&
    css`
      cursor: pointer;

      :before {
        content: '${label}';
        position: absolute;
        z-index: 3;

        width: 50%;
        min-height: 35px;

        top: calc(50% - 35px / 2);
        left: calc(50% - 50% / 2);

        background-color: ${theme.getColor('white', 95)};
        color: ${theme.colors.greyishBlue};
        box-shadow: 0px 3px 6px ${theme.getColor('black', 15)};

        border-radius: 4px;

        padding: ${theme.spacings.s1};

        text-align: center;
      }

      :after {
        content: '';
        position: absolute;
        z-index: 2;

        width: 100%;
        height: 100%;

        top: 0;
        left: 0;

        background-color: ${theme.getColor('black', 25)};
      }

      :before,
      :after {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
      }
      :not(:hover) {
        :before,
        :after {
          opacity: 0;
          overflow: hidden;
        }
      }
    `}
`
