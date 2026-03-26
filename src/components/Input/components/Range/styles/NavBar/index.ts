import styled, { css } from 'styled-components'

type NavBarProps = {
  $position: 'bottom' | 'top'
  $strict: boolean | undefined
}

const NavBar = styled.div<NavBarProps>`
  position: absolute;
  z-index: 2;

  left: 0;
  width: 100%;
  height: calc(33px + ${({ theme }) => theme.spacings.s3});
  transition: height 0.25s ease-in-out;
  overflow: hidden;

  ${({ theme, $position: position, $strict: strict }) => {
    const distance = strict ? `calc(${theme.spacings.s1} / 2)` : '0px'

    return position === 'bottom'
      ? css`
          bottom: calc(100% + ${distance});
          > div:nth-child(1) {
            bottom: ${theme.spacings.s1};
          }

          > div:nth-child(2) {
            top: calc(100% - 7px);
          }
        `
      : css`
          top: calc(100% + ${distance});
          > div:nth-child(1) {
            top: ${theme.spacings.s1};
          }

          > div:nth-child(2) {
            bottom: calc(100% - 7px);
            transform: rotate(180deg);
          }
        `
  }}

  > div:nth-child(1) {
    position: absolute;
    z-index: 2;

    width: 93px;
    /* height: 30px; */
    padding: 9px 7px;
    font-size: 13px;
    line-height: 16px;
    border-radius: 1px;

    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacings.s1};

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > div:nth-child(2) {
    position: absolute;
    width: 0px;
    height: 0px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 5px solid ${({ theme }) => theme.colors.blue};
  }
`

export default NavBar
