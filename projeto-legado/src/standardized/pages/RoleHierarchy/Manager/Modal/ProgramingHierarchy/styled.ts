import { MwScrollContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 59px;
  justify-content: space-between;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightestGrey} `};
  padding: ${({ theme }) => theme.spacings.s4};
`

export const FooterContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`

export const Message = styled.div`
  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  color: ${({ theme }) => theme.colors.greyishBlue};
`

export const Subtitle = styled.span`
  font-size: ${({ theme }) => theme.spacings.s3};
  line-height: 17px;
  color: ${({ theme }) => theme.colors.greyishBlue};
`

export const ScrollContainer = styled(MwScrollContainer)`
  padding: 0px;
`
export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 72px;
  width: 130px;
  border-right: ${({ theme }) => `1px solid ${theme.colors.lightestGrey} `};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightestGrey} `};
`
export const LeftColumnTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  padding: 0px 36px;
  line-height: 24px;
  font-size: ${({ theme }) => theme.spacings.s3};
  color: ${({ theme }) => theme.colors.greyishBlue};
  width: 100%;
`

export const LeftSubtitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  height: 24px;
`
export const LeftSubtitle = styled.span`
  padding: 4px 12px;
  line-height: 17px;
  font-size: ${({ theme }) => theme.spacings.s3};
  color: ${({ theme }) => theme.colors.greyishBlue};
  width: 100%;
`

export const RightColumn = styled.div`
  display: flex;
  justify-content: left;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightestGrey}`};
  padding: ${({ theme }) => `${theme.spacings.s4} ${theme.spacings.s3}`};
  align-items: center;
  flex: 1;
  width: 100%;
  gap: ${({ theme }) => theme.spacings.s3};
`
export const RightColumnTagContainer = styled.div<{ $isStatus: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ $isStatus, theme }) =>
    `1px solid ${$isStatus ? theme.colors.red : theme.colors.lightGrey}`};
  border-radius: 4px;
  height: 24px;
`
export const RightTag = styled.span<{ $isStatus: boolean }>`
  padding: 4px 12px;
  line-height: 17px;
  font-size: ${({ theme }) => theme.spacings.s3};
  color: ${({ $isStatus, theme }) =>
    $isStatus ? theme.colors.red : theme.colors.greyishBlue};
  width: 100%;
`
