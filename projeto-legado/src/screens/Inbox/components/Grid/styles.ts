import styled, { css } from 'styled-components'

export const Container = styled.div`
  flex: 1;
  max-width: calc(100% - 219px);
  border: 1px solid #d6d6d6;
  display: flex;
  flex-direction: column;
  overflow: auto;
`

export const Title = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacings.s3};
  border-bottom: 1px solid #d6d6d6;

  > h2 {
    font-size: 18px;
    font-weight: bold;
    color: #192338;
  }
`

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`

export const ContentHeader = styled.div`
  background-color: #2630461a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d6d6d6;

  > div {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  > div:first-child {
    padding: 14px 21px;
  }

  > div:last-child {
    height: 100%;

    > div:last-child input[type='search']::placeholder {
      color: ${({ theme }) => theme.colors.greyishBlue};
    }
  }
`

export const ContentBody = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
`

interface ContentItem {
  readed: boolean
}

export const ContentItem = styled.div<ContentItem>`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d6d6d6;
  font-weight: ${({ readed }) => (readed ? 'normal' : 'bold')};
  padding: 14px 21px;
  gap: 14px;

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
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

export const Subject = styled.span`
  width: 166px;
  display: flex;
  align-items: center;
  gap: 7px;
`

export const EllipsisContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const EmptyMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`
