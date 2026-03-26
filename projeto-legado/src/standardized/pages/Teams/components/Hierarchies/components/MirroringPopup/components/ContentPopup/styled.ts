import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const ContentPopupContainer = styled.div`
  width: 305px;
  height: 271px;
  display: flex;
  flex-direction: column;
`

export const ContentPopupHeader = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacings.s1};
  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightestGrey}`};
  height: 71px;
  color: ${({ theme }) => theme.colors.greyishBlue};
`

export const ContentPopupTitle = styled.div`
  line-height: 19px;
  font-weight: 600;
`

export const ContentPopupSubTitle = styled(MwEllipsisContainer)`
  line-height: 17px;
`

export const ContentPopupRow = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacings.s3};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightestGrey}`};
  height: 66px;
  gap: ${({ theme }) => theme.spacings.s3};
  align-items: center;
`

export const ContentPopupRowTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  flex: 1;
  overflow: hidden;

  > div {
    ${({ theme }) => theme.useTypography('p')}
    line-height: 17px;
    color: ${({ theme }) => theme.colors.greyishBlue};
    display: flex;
    gap: calc(${({ theme }) => theme.spacings.s1} / 2);

    :nth-child(1) {
      font-weight: bold;
    }
    :nth-child(2) {
      opacity: 0.5;
    }
  }
`

export const IconButton = styled.button`
  width: fit-content;
  background: transparent;
  border: none;
  cursor: pointer;

  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`
