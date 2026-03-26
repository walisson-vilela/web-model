import { MwScrollContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const Header = styled.div`
  width: 100%;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightestGrey}`};
  padding: ${({ theme }) => `${theme.spacings.s1} ${theme.spacings.s3}`};
  display: flex;
  flex-direction: column;

  b {
    color: ${({ theme }) => theme.colors.greyishBlue};
    display: inline-block;
    ${({ theme }) => theme.useTypography('p')};
    font-weight: 600;
    line-height: 17px;
  }

  span {
    display: inline-block;
    height: 16px;
    color: ${({ theme }) => theme.getColor('greyishBlue', 70)};
    ${({ theme }) => theme.useTypography('h6')};
    line-height: 16px;
  }
`
export const LeftCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  flex: 1;
`

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;

  border-right: ${({ theme }) => `1px solid ${theme.colors.lightestGrey}`};
`

export const SearchContainer = styled.div`
  padding: ${({ theme }) => theme.spacings.s3};
  background-color: ${({ theme }) => theme.colors.iceWhite};
`

export const DroppableContainer = styled(MwScrollContainer)`
  padding: ${({ theme }) => theme.spacings.s3};
  flex: 1;
  > div > div {
    display: flex;

    align-items: center;
  }
`

export const MessageContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;

  &:not(.empty) > :nth-child(1) {
    opacity: 0;
  }

  > :nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.25s ease-in-out;
  }
`
