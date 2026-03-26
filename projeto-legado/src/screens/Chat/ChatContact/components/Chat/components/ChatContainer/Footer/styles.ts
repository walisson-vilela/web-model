import styled, { css } from 'styled-components'

interface SideBarProps {
  activeSideBar: boolean
}

export const Container = styled.footer<SideBarProps>`
  position: relative;
  height: 78px;
  background: #fff;
  display: flex;
  align-items: center;
  border-top: 1px solid #eaeaea;
  padding: 14px 21px;

  ${(props) => {
    if (props.activeSideBar) {
      return css`
        width: calc(100% - 262px);
      `
    }
    return css`
      width: 100%;
    `
  }};
`

export const LeftIcons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 14px;

  svg {
    margin: 0 7px;
    cursor: pointer;
  }
`

export const RightIcons = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  svg {
    margin: 0 7px;
  }
`

export const PickerContainer = styled.div`
  position: absolute;
  bottom: 78px;
`

export const Label = styled.label`
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
  }

  input {
    display: none;
  }
`

export const TextArea = styled.textarea`
  flex: 1;
  height: 50px;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #c8c8c8;
  resize: none;
`
