import styled, { css } from 'styled-components'

export const Container = styled.div`
  flex: 1;
  max-width: calc(100% - 219px);
  display: flex;
  flex-direction: column;
  /** {footer size} - {parent gap}  */
  height: calc(100% - 43px - 14px);
  border: 1px solid #d6d6d6;
  position: relative;
`

export const Footer = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
`

export const Title = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 21px;

  > h2 {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 18px;
    font-weight: bold;
    color: #19233880;
    margin: 0;
  }
`

export const Important = styled.label`
  height: 16px;
  cursor: pointer;

  input {
    display: none;
  }

  svg path {
    stroke: black;
    stroke-width: 2px;
    fill: none;
  }

  input:checked + svg path {
    fill: #fbcb01;
  }
`

export const BodyContainer = styled.div`
  padding-left: 63px;
  padding-right: 21px;
`

export const Body = styled.div`
  .ql-indent-1 {
    padding-left: 3em;
  }

  .ql-indent-2 {
    padding-left: 6em;
  }

  .ql-indent-3 {
    padding-left: 9em;
  }

  .ql-indent-4 {
    padding-left: 12em;
  }

  .ql-indent-5 {
    padding-left: 15em;
  }

  .ql-indent-6 {
    padding-left: 18em;
  }

  .ql-indent-7 {
    padding-left: 21em;
  }

  .ql-indent-8 {
    padding-left: 24em;
  }

  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: right;
  }

  .ql-align-justify {
    text-align: justify;
  }

  .quill {
    flex: 1;
  }

  .ql-container,
  .ql-editor {
    height: 100%;
  }

  .ql-editor {
    padding: 14px 21px;

    &:focus-visible {
      outline: 0;
    }
  }

  .ql-clipboard,
  .ql-tooltip {
    display: none;
  }
`

export const Subject = styled.span`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 18px;
  font-weight: bold;
  color: #192338;
  padding: 0 21px;
`

export const Sender = styled.div`
  margin-top: 35px;
  padding: 0 35px;
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 16px;
  font-weight: bold;
  color: #192338;
`

interface AvatarI {
  src: string
}

export const Avatar = styled.div<AvatarI>`
  width: 21px;
  height: 21px;
  background: white url(${({ src }) => src}) no-repeat center;
  background-size: contain;
`

export const Recipients = styled.div`
  padding-left: 63px;
  padding-right: 21px;
  margin-bottom: 35px;
  font-size: 13px;
  color: #192338;
  justify-content: space-between;

  display: flex;
  align-items: center;
  gap: 3.5px;

  > div:nth-child(1) {
    flex: 1;
    &,
    div {
      display: flex;
      align-items: center;
      gap: 3.5px;
    }
  }
`

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 35px 0;
`

export const File = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border-left: 3px solid #3455ab;
  background-color: #3455ab1a;
  color: #192338;
  padding: 14px 7px;

  span {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  i {
    cursor: pointer;
  }
`

export const Post = styled.div`
  display: flex;
  gap: 14px;

  &:not(:last-child) {
    margin-bottom: 14px;
  }

  img {
    max-height: 140px;
    max-width: 250px;
  }
`
export const HighlightContainer = styled.div<{ paused: boolean }>`
  padding-left: 55px;

  ${({ paused }) =>
    paused &&
    css`
      text-decoration: line-through;
    `}
`

export const PopupHeader = styled.h2`
  font: normal normal 900 18px/24px lato;
  color: #000000cc;
`

export const PopupSubtitle = styled.p`
  font: normal normal bold 14px/24px Lato;
  letter-spacing: 0px;
  color: #000000cc;
`

export const PopupContent = styled.div`
  display: flex;
  width: 219px;
  max-height: 194px;
  flex-direction: column;
  overflow-y: auto;
`
