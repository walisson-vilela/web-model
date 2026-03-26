import styled, { css } from 'styled-components'

export const FileContainer = styled.div<{ progress: number }>`
  border-left: 2px solid ${({ theme }) => theme.colors.blue};
  background-color: ${({ theme }) => theme.getColor('blue', 10)};
  color: ${({ theme }) => theme.colors.darkBlue};

  display: flex;
  flex-direction: column;

  width: 251px;

  > div {
    :nth-child(1) {
      display: flex;
      gap: ${({ theme }) => theme.spacings.s4};
      padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s1}`};

      > {
        :nth-child(1) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: calc(${({ theme }) => theme.spacings.s1} / 2);
          overflow: hidden;
          font-size: ${({ theme }) => theme.spacings.s3};
          line-height: 17px;

          ${({ progress }) =>
            progress >= 100 &&
            css`
              cursor: pointer;
            `}
        }
      }
    }
    :nth-child(2) {
      width: ${({ progress }) => progress}%;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.blue};

      ${({ progress }) =>
        progress < 100 &&
        css`
          border-radius: 0 2px 2px 0;
        `}
      transition-property: width;
      transition-timing-function: ease-in-out;
      transition-duration: 0.5s;
    }
  }
`
