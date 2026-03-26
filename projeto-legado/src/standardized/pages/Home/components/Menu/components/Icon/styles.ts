import styled, { css, keyframes } from 'styled-components'

const movingBackground = keyframes`
  000.00% { background-image: linear-gradient(#FFFFFF 0px 000%, #3455AB 0px 050%, #FFFFFF 0px 100%); }
  007.14% { background-image: linear-gradient(#FFFFFF 0px 010%, #3455AB 0px 060%, #FFFFFF 0px 100%); }
  014.28% { background-image: linear-gradient(#FFFFFF 0px 020%, #3455AB 0px 070%, #FFFFFF 0px 100%); }
  021.42% { background-image: linear-gradient(#FFFFFF 0px 030%, #3455AB 0px 080%, #FFFFFF 0px 100%); }
  028.56% { background-image: linear-gradient(#FFFFFF 0px 040%, #3455AB 0px 090%, #FFFFFF 0px 100%); }
  035.70% { background-image: linear-gradient(#FFFFFF 0px 050%, #3455AB 0px 100%, #FFFFFF 0px 000%); }
  042.84% { background-image: linear-gradient(#FFFFFF 0px 060%, #3455AB 0px 100%, #FFFFFF 0px 000%); }
  049.98% { background-image: linear-gradient(#FFFFFF 0px 070%, #3455AB 0px 100%, #FFFFFF 0px 000%); }
  057.12% { background-image: linear-gradient(#FFFFFF 0px 080%, #3455AB 0px 100%, #FFFFFF 0px 000%); }
  064.26% { background-image: linear-gradient(#FFFFFF 0px 090%, #3455AB 0px 100%, #FFFFFF 0px 000%); }
  071.40% { background-image: linear-gradient(#FFFFFF 0px 100%, #3455AB 0px 100%, #FFFFFF 0px 000%); }
  078.54% { background-image: linear-gradient(#FFFFFF 0px 000%, #3455AB 0px 010%, #FFFFFF 0px 100%); }
  085.68% { background-image: linear-gradient(#FFFFFF 0px 000%, #3455AB 0px 020%, #FFFFFF 0px 100%); }
  092.82% { background-image: linear-gradient(#FFFFFF 0px 000%, #3455AB 0px 030%, #FFFFFF 0px 100%); }
  100.00% { background-image: linear-gradient(#FFFFFF 0px 000%, #3455AB 0px 040%, #FFFFFF 0px 100%); }
`

export const IconContainer = styled.div`
  position: relative;
  box-sizing: content-box;
  min-width: 52px;
  min-height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-left-width: 4px;
  border-left-style: solid;

  transition-property: opacity, border-left-color;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;

  z-index: 993;

  > svg {
    width: 18px;
    height: 18px;
    background-color: ${({ theme }) => theme.colors.white};
  }

  &.loading > svg {
    animation: ${movingBackground} 1s infinite;
  }

  > svg * {
    fill: ${({ theme }) => theme.colors.darkBlue};

    transition-property: fill;
    transition-duration: 0.25s;
    transition-timing-function: linear;
  }
`

export const Bullet = styled.div<{ $active: boolean }>`
  position: absolute;

  transition-property: width height top left;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);

  ${({ $active: active }) => {
    if (active) {
      return css`
        --width: 14px;
        top: 7px;
        right: 20px;
      `
    }

    return css`
      --width: 0px;
      top: 14px;
      right: 27px;
    `
  }};

  width: var(--width);
  height: var(--width);
  font-size: calc(var(--width) / 2);
  line-height: calc(var(--width) / 2);

  color: #fff;
  background-color: #66bb6a;

  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
