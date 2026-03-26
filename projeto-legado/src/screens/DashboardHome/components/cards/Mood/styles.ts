import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 21px;
  height: 100%;
`

export const MoodItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;

  strong {
    font-size: 14px;
    color: #4b5563;
  }
`

const faceBase = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid currentColor;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;

  span,
  span::before,
  span::after {
    display: block;
    position: absolute;
    content: '';
  }

  span::before,
  span::after {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    top: 12px;
  }

  span::before {
    left: 10px;
  }

  span::after {
    right: 10px;
  }
`

const moodFaces: Record<string, ReturnType<typeof css>> = {
  sadSweat: css`
    span::after {
      top: 10px;
    }

    span::before {
      top: 14px;
    }

    span {
      &::after,
      &::before {
        transform: none;
      }

      &::after {
        width: 8px;
        height: 8px;
      }
    }

    &::after {
      content: '';
      position: absolute;
      width: 8px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid currentColor;
      border-bottom: none;
      border-left: none;
      right: 4px;
      top: 2px;
      transform: rotate(20deg);
    }

    &::before {
      content: '';
      position: absolute;
      width: 24px;
      height: 14px;
      border: 2px solid currentColor;
      border-top: none;
      border-radius: 0 0 50px 50px;
      bottom: 8px;
      left: 6px;
    }
  `,
  sad: css`
    &::before {
      content: '';
      position: absolute;
      width: 24px;
      height: 14px;
      border: 2px solid currentColor;
      border-top: none;
      border-radius: 0 0 50px 50px;
      bottom: 10px;
      left: 6px;
    }
  `,
  meh: css`
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 2px;
      background: currentColor;
      bottom: 12px;
      left: 10px;
    }
  `,
  smile: css`
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 10px;
      border: 2px solid currentColor;
      border-top: none;
      border-radius: 0 0 50px 50px;
      bottom: 10px;
      left: 8px;
    }
  `,
  laugh: css`
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 12px;
      border: 2px solid currentColor;
      border-top: none;
      border-radius: 0 0 50px 50px;
      bottom: 8px;
      left: 8px;
    }

    &::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 4px;
      background: currentColor;
      bottom: 14px;
      left: 14px;
    }
  `,
}

export const Face = styled.div<{ $color: string; 'data-face': string }>`
  color: ${({ $color }) => $color};
  ${faceBase};
  ${({ 'data-face': face }) => moodFaces[face] || ''};
`
