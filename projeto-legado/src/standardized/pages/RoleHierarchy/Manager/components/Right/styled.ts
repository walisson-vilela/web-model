import { MwIcon } from '@mw-kit/mw-ui'
import styled, { css } from 'styled-components'

export const Header = styled.div`
  padding: ${({ theme }) => `${theme.spacings.s1} ${theme.spacings.s3}`};
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.greyishBlue};
  ${({ theme }) => theme.useTypography('p')};
  line-height: 17px;

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
export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  border-bottom: 1px solid rgb(226, 226, 227);
`
export const RightBody = styled.div`
  display: flex;
`

export const RightRow = styled.div`
  display: flex;
  border-bottom: 1px solid rgb(226, 226, 227);
`

export const RightColumn = styled.div`
  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};
  align-items: center;
  flex: 1;
  display: flex;
  gap: ${({ theme }) => theme.spacings.s3};
  flex-flow: row wrap;
`
export const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 7;
  overflow: auto;
`

export const IconButton = styled(MwIcon)<{ $plus: boolean }>`
  background: ${({ theme, $plus: plus }) =>
    plus ? theme.colors.blue : theme.colors.red};
  border-radius: 60%;
  ${(props) =>
    !('onClick' in props) &&
    css`
      opacity: 0.5;
    `}
`
export const IconButtonContainer = styled.div`
  padding-right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 104px;
  gap: 7px;
`
export const Level = styled.span`
  color: ${({ theme }) => theme.colors.greyishBlue};
  ${({ theme }) => theme.useTypography('p')};
  line-height: 17px;
  padding: 15px 24px;
`
