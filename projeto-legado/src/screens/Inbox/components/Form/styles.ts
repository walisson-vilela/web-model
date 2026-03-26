import styled, { css } from 'styled-components'

export const Container = styled.div`
  flex: 1;
  max-width: calc(100% - 219px);
  display: flex;
  flex-direction: column;
  overflow: auto;
  /** {footer size} - {parent gap}  */
  height: calc(100% - 43px - 14px);
`

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #192338;
  padding: ${({ theme }) => theme.spacings.s3};
  border-bottom: 1px solid #d6d6d6;
`

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  border: 1px solid #d6d6d6;
  position: relative;
`

interface ContentItem {
  header?: boolean
  withoutPadding?: boolean
}

export const ContentItem = styled.div<ContentItem>`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d6d6d6;

  ${({ header }) =>
    header &&
    css`
      padding: 0 21px;
      background-color: #2630461a;
    `}

  > * {
    min-height: 45px;
    height: 45px;
    display: flex;
    align-items: center;
  }
`

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  color: black;
  font-weight: normal;
`

export const Cell = styled.div`
  padding: 0 14px;
`

export const RecipientNames = styled.span`
  flex: 1;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 21px;
`

export const HighlightContainer = styled.div`
  & > div > div:last-child {
    top: 35px;
    bottom: inherit;
  }

  > {
    :nth-child(1) {
      display: flex;
      gap: ${({ theme }) => theme.spacings.s1};

      > {
        :nth-child(1) {
          flex: 1;
          margin-bottom: unset;
        }
        :nth-child(2) {
          width: unset;
        }
      }
    }
  }
`

export const FileButton = styled.label`
  cursor: pointer;
  color: white;
  border-radius: 4px;
  padding: 14px;
  font-size: 14px;
  font-weight: bold;
  user-select: none;
  height: 33px;
  background-color: #3455ab;
  line-height: 2.15;
  margin-bottom: 7px;

  input {
    display: none;
  }
`

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 14px 21px;
`

export const Footer = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
`

export const PostContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  padding: 14px;
`

export const Posts = styled.div`
  flex: 1;
  overflow-y: auto;
  height: 100%;
`

export const Description = styled.small`
  color: #19233880;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 7px;
  justify-content: center;
`
