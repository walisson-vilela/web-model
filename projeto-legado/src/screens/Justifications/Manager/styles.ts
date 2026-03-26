import styled, { css } from 'styled-components'

export const UploadImage = styled.div`
  padding: 10px 8px;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 210px;
    }
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    margin-right: 4px;
  }
`

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-right: 4px;
  }
`
export const PopupContent = styled.div`
  width: 316px;
  height: 252px;
  display: flex;
  flex-direction: column;

  header {
    padding: 14px;
    display: flex;
    flex-direction: column;

    strong {
      & + strong {
        margin-top: 7px;
      }
    }
  }

  section {
    flex: 1;
    border-top: 1px solid #ececec;
    overflow-y: auto;
    padding: 14px;
  }
`

export const ImpactContainer = styled.div`
  display: flex;
  align-items: center;
`

interface ActionProps {
  days: number
}
export const ActionContainer = styled.div<ActionProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  width: 100%;
  &:hover {
    text-decoration: underline;
  }

  span {
    padding-right: 2px;
  }

  ${({ days }) => {
    if (days >= 5 && days <= 7) {
      return css`
        .area {
          color: #b2ddb4;
        }
      `
    } else if (days >= 3 && days < 4) {
      return css`
        .area {
          color: #fbd033;
        }
      `
    } else {
      return css`
        .area {
          color: #a1d5a4;
        }
      `
    }
  }}
`

export const Item = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-left: 3px;
  }
  &:hover {
    text-decoration: underline;
  }
`

export const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 316px;
  height: 252px;
`

export const PopUp = styled.div`
  padding: 14px 14px 0 14px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 14px;

  strong {
    color: #000000cc;
    font-size: 14px;
    & + strong {
      margin-top: 7px;
    }
  }
`

export const PopUpMain = styled.div`
  width: 100%;
  border-top: 1px solid #e2e2e2;
  padding: 14px;
`
