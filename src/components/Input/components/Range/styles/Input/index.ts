import styled, { css } from 'styled-components'

type InputProps = { $activeBullet: boolean; $bulletSize: number }
type BulletProps = React.InputHTMLAttributes<HTMLInputElement> & InputProps

const bullet = css<BulletProps>`
  appearance: none;
  width: ${({ $bulletSize: bulletSize }) => bulletSize}px;
  height: ${({ $bulletSize: bulletSize }) => bulletSize}px;
  border-radius: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.lightestGrey};

  box-shadow: 0px 1px 3px ${({ theme }) => theme.getColor('black', 10)};
  box-sizing: border-box;

  background-color: ${({ theme, $activeBullet: activeBullet }) => {
    return theme.colors[activeBullet ? 'blue' : 'white']
  }};

  transition: background-color 0.2s ease-in-out;
`

const Input = styled.input<InputProps>`
  appearance: none;
  width: 100%;
  height: 10px;
  background-color: transparent;
  outline: none;
  position: relative;
  z-index: 3;
  margin: 0;

  &:not(:disabled) {
    cursor: pointer;
  }

  /** firefox */
  &::-moz-range-thumb {
    ${bullet}
  }
  /** ie */
  &::-ms-thumb {
    ${bullet}
  }
  /** chrome */
  &::-webkit-slider-thumb {
    ${bullet}
  }
`

export default Input
