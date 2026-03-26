import styled from 'styled-components'

export const StyledDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  > div {
    position: initial;

    display: flex;
    align-items: center;
    height: 100%;

    > label input {
      border: 0;
    }
    > label button {
      bottom: auto;
      top: 50%;
      transform: translateY(-50%);
    }
    > label + div {
      bottom: auto;
      top: 50%;
      transform: translateY(-50%);
      left: 14px;
      height: 17px;
      width: calc(100% - 24px - 28px);
    }
  }
`

export const StyledInterval = styled.div`
  & > div {
    position: initial;
    & > div {
      border: none;
    }
  }
`
