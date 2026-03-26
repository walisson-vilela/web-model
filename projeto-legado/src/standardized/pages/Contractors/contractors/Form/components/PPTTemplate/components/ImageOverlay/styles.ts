import styled, { css } from 'styled-components'

export const ImageBackground = styled.div`
  display: flex;
  flex: 1;

  background-color: ${({ theme }) => theme.colors.silver};
  background-size: 4.01%;
`

export const Image = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  max-height: 100%;

  background-image: url(${({ src }) => src});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  position: relative;

  ${({ onClick }) =>
    onClick
      ? css`
          cursor: pointer;
        `
      : css`
          min-height: 314px;
        `}

  /**primeira div */
  > div {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    padding: ${({ theme }) =>
      `${theme.spacings.s1} ${theme.spacings.s3} ${theme.spacings.s1} ${theme.spacings.s1}`};

    background-image: linear-gradient(
      to bottom,
      rgb(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.5)
    );

    transition: opacity 0.5s ease-in-out;

    /**segunda div */
    > div {
      display: flex;
      gap: ${({ theme }) => theme.spacings.s1};
      align-items: center;
      justify-content: space-between;

      /**terceira div */
      > div {
        :nth-child(1) {
          ${({ theme }) => theme.useTypography('h2', { fontWeight: 'bold' })};
          color: ${({ theme }) => theme.colors.iceWhite};
        }

        :nth-child(2) {
          display: flex;
          gap: ${({ theme }) => theme.spacings.s1};
        }
      }
    }
  }

  :hover > div {
    opacity: 1;
  }
  :not(:hover) > div {
    opacity: 0;
  }
`
