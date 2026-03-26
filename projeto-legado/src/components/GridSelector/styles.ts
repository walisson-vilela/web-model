import { MwGrid } from '@mw-kit/mw-ui'
import styled, { css } from 'styled-components'

export const Container = styled.div<{ $scrollHeight?: string }>`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  border-radius: 4px 4px 0 0;

  height: 100%;
  display: flex;
  flex-direction: column;

  > div:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.lightestGrey};

    ${({ $scrollHeight: scrollHeight }) =>
      scrollHeight &&
      css`
        min-height: ${scrollHeight};
        max-height: ${scrollHeight};
      `}
  }
`

export const Col = styled(MwGrid.Col)`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  > label {
    flex: 1;
    > div:last-child {
      display: flex;
      flex-direction: column;
      justify-content: center;

      gap: 3px;
      min-height: 30px;
      color: ${({ theme }) => theme.colors.darkBlue};

      > :nth-child(1) {
        ${({ theme }) => theme.useTypography('p')};
        line-height: 17px;
      }

      > :nth-child(2) {
        ${({ theme }) => theme.useTypography('h6')};
        line-height: 16px;
        opacity: 0.5;
      }
    }
  }
`

export const EmptyMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
  color: ${({ theme }) => theme.colors.darkestGrey};
  height: 100%;
`

export const ActionTypeLabel = styled.span`
  color: ${({ theme }) => theme.colors.pink};
`
