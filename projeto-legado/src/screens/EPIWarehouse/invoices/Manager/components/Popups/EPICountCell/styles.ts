import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Link = styled.span`
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 21px;
  border-bottom: 1px solid #dadadb;

  > div:first-child {
    color: #000000cc;
    font-weight: normal;
    width: 231px;

    > b {
      font-weight: 900;
    }

    > p:first-child {
      font-size: 16px;
      margin-bottom: 7px;
    }

    > p:last-child {
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 0;
      margin-right: 14px;
    }
  }
`

interface BodyProps {
  loading?: boolean
}

export const Body = styled.div<BodyProps>`
  height: 196px;
  overflow-y: auto;
  color: #263046;

  > div {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 14px;
    border-bottom: 1px solid #dadadb;

    > div p {
      font-size: 14px;
      font-weight: normal;
      margin: 0;
    }

    > div p:last-child:not(:first-child) {
      margin-top: 3.5px;
      opacity: 50%;
    }

    > div:last-child:not(:first-child) {
      margin-left: 14px;
    }

    > div:last-child {
      flex: 1;
    }
  }
`

interface AvatarProps {
  source: string
  size: 'small' | 'large'
}

export const Avatar = styled.div<AvatarProps>`
  height: ${(props: AvatarProps) =>
    props.size === 'small' ? '35px' : '175px'};
  width: ${(props: AvatarProps) => (props.size === 'small' ? '35px' : '175px')};
  border-radius: 50%;
  background: #f2f2f2 url(${(props: AvatarProps) => props.source || ''})
    no-repeat scroll center;
  background-size: cover;

  ${(props: AvatarProps) =>
    props.source === ''
      ? css`
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : css`
          cursor: pointer;
        `}
`
