import styled, { css } from 'styled-components'

export const PostContainer = styled.div<{ progress: number }>`
  display: flex;
  gap: 14px;

  &:not(:last-child) {
    margin-bottom: 14px;
  }

  > div {
    :nth-child(1) {
      > {
        :nth-child(1) {
          max-height: 140px;
          max-width: 250px;
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
    }
  }
`

export const PostLabel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 355px;
`
