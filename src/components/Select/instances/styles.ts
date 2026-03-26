import styled from 'styled-components'

export const Header = styled.div`
  padding: 0 ${({ theme }) => theme.spacings.s3};
  margin: ${({ theme }) => theme.spacings.s1} 0;
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  justify-content: space-between;
  align-items: center;
`

export const DraftSwitch = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  ${({ theme }) => theme.useTypography('h4')}
  color: ${({ theme }) => theme.getColor('black', 80)};

  transition-property: color;
  transition-duration: 0.4s;
  transition-timing-function: ease-in-out;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:not(:disabled):hover {
    color: ${({ theme }) => theme.colors.blue};
  }

  > span:nth-child(1) {
    position: relative;
    width: calc(${({ theme }) => theme.spacings.s3} * 2);
    height: ${({ theme }) => theme.spacings.s3};
    background-color: ${({ theme }) => theme.colors.warningGray};
    border-radius: 20px;
    transition-property: background-color;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
    box-sizing: content-box;

    &:before {
      content: '';
      transition-property: left, transform;
      transition-duration: 0.4s;
      transition-timing-function: ease-in-out;
      position: absolute;
      border-width: 1px;
      border-style: solid;
      border-radius: 100%;
      border-color: ${({ theme }) => theme.colors.lightGrey};
      left: 0;
      box-shadow: 0px 1px 3px ${({ theme }) => theme.getColor('black', 10)};
      width: 50%;
      height: 100%;
      background-color: ${({ theme }) => theme.colors.white};
      box-sizing: border-box;
    }
  }

  &[aria-checked='true'] > span:nth-child(1) {
    background-color: ${({ theme }) => theme.colors.blue};
  }

  &[aria-checked='true'] > span:nth-child(1):before {
    left: 100%;
    transform: translateX(-100%);
  }
`

export const SelectAllButton = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 0;

  ${({ theme }) => theme.useTypography('h6')}
  color: ${({ theme }) => theme.colors.greyishBlue};

  transition-property: color;
  transition-duration: 0.25s;
  transition-timing-function: linear;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:not(:disabled):hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`
