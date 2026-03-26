import styled, { css } from 'styled-components'

const styles = {
  spaccing: {
    mini: 7,
    medium: 14,
    large: 21,
    extraLarge: 28,
  },
}

export const Container = styled.div`
  flex: 2;
  max-width: 77%;
  min-width: 30%;
  width: 77%;
  height: 100%;
  border-left: 1px solid #d6d6d6;
  display: flex;
  flex-direction: column;
`
export const Content = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
`
// Header Styles

interface SideBarProps {
  activeSideBar: boolean
}
export const HeaderContainer = styled.div<SideBarProps>`
  position: relative;
  padding: ${styles.spaccing.medium}px ${styles.spaccing.large}px;
  background: #e9eaec 0% 0% no-repeat padding-box;
  border-bottom: 1px solid #d6d6d6;
  opacity: 1;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${(props) => {
    if (props.activeSideBar) {
      return css`
        width: calc(100% - 245px);
      `
    }
    return css`
      width: 100%;
    `
  }}
  .ui.floating.dropdown>.menu {
    width: 200px !important;
    position: absolute !important;
    right: -22px !important;
  }
  .ui.dropdown .menu > .item:hover {
    background: #fff !important;
  }
`

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: ${styles.spaccing.mini}px;
    strong {
      font-size: 15px;
      color: #192338;
    }
    span {
      font-size: 14px;
      color: #192338;
    }
  }
`

export const Toolbar = styled.div`
  svg {
    cursor: pointer;
    & + svg {
      margin-left: 13px;
    }
  }
`

export const PopupButtons = styled.div`
  button {
    border: 0;
    background: transparent;
    width: 100%;
    flex: 1;
    text-align: left;
    & + button {
      margin-top: 8px;
    }
  }
`
// SideBar Styles

export const SideBar = styled.div`
  width: 262px;
  background: #e9eaec 0% 0% no-repeat padding-box;
  border-left: 1px solid #d6d6d6;

  height: calc(100% + 78px);

  header {
    width: 100%;
    display: flex;
    align-items: center;
    height: 78px;
    padding: 31px 14px 30px 14px;
    border-bottom: 1px solid #d6d6d6;

    strong {
      margin-left: 12px;
      color: #192338;
      font-weight: bold;
    }

    svg {
      cursor: pointer;
    }
  }

  main {
    flex: 1;
    padding: 14px;
  }
`

export const CustomSearch = styled.div`
  background-color: #fff;
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid #c8c8c8;
  border-radius: 4px;

  & > svg {
    cursor: pointer;
    padding-left: 4px;
  }

  & > div {
    flex: 1;
  }

  form .ui.input > input[type='search'] {
    border: 0;
    background: transparent;
  }
`
