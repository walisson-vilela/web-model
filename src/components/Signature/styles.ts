import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
`

export const CanvasContainer = styled.div<{ $invalid?: boolean }>`
  position: relative;
  flex: 1;
  overflow: hidden;
  background-color: ${({ theme, $invalid: invalid }) =>
    invalid ? theme.getColor('warningRed', 5) : theme.colors.white};

  &[data-placeholder]:before {
    content: attr(data-placeholder);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    color: ${({ theme, $invalid: invalid }) =>
      theme.colors[invalid ? 'warningRed' : 'darkBlue']};

    ${({ theme }) => theme.useTypography('h1')}
    font-size: 59px;
    line-height: 71px;
    opacity: 0.1;
    z-index: 1;
  }

  canvas {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid
      ${({ theme, $invalid: invalid }) =>
        theme.colors[invalid ? 'warningRed' : 'lightGrey']};
    border-radius: 4px;
    z-index: 2;
  }

  /* icons container */
  > div:nth-child(1) {
    position: absolute;
    top: ${({ theme }) => theme.spacings.s3};
    right: ${({ theme }) => theme.spacings.s3};
    display: flex;
    gap: ${({ theme }) => theme.spacings.s1};
    z-index: 3;

    > button {
      padding: 0;
      outline: none;
      border: none;
      background: none;

      > i.icon,
      > i.icon:before {
        color: #4e4e4e;
        font-size: 20px;
        line-height: 20px;
        width: 20px;
      }

      &:not(:disabled) {
        cursor: pointer;
      }
      &:disabled {
        opacity: 0.5;
      }

      transition: opacity 0.25s linear;
    }
  }
`
