import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 467px;
  height: 271px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 6px 10px ${({ theme }) => theme.getColor('black', 15)};
  border-radius: 4px;

  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${({ theme }) => theme.getColor('black', 80)};
  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};

  > div {
    :nth-child(1) {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacings.s1};

      > div:nth-child(1) {
        ${({ theme }) => theme.useTypography('h2')}
        line-height: 19px;
      }

      > div:nth-child(2) {
        ${({ theme }) => theme.useTypography('p')}
        line-height: 17px;

        strong {
          font-weight: bold;
        }
      }
    }
  }

  > :nth-child(2) {
    width: 149px;
  }
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s4};
  padding: ${({ theme }) =>
    `${theme.spacings.s3} 0 ${theme.spacings.s4} ${theme.spacings.s4}`};

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  color: ${({ theme }) => theme.colors.greyishBlue};

  strong {
    font-weight: bold;
  }

  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};

  :last-child {
    border-bottom-color: transparent;
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
