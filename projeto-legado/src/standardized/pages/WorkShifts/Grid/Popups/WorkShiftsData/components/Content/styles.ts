import { MwGrid, MwScrollContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const PopupContainer = styled.div`
  width: 447px;
  height: 301px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  overflow: hidden;
  padding: 0;
`

export const PopupHeader = styled.div`
  font-weight: bold;
  ${({ theme }) => theme.useTypography('h2')}
  padding: ${({ theme }) => `${theme.spacings.s3} 0 0 ${theme.spacings.s4}`};
`

export const SubHeader = styled.div`
  ${({ theme }) => theme.useTypography('p')}
  padding: ${({ theme }) => `0 0 0 ${theme.spacings.s4}`};
`

export const ScrollArea = styled(MwScrollContainer)`
  flex: 1;
  min-height: 0;
  max-height: 190px;
  overflow-y: auto;
`

export const Row = styled(MwGrid.Row)<{ header?: boolean }>`
  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  color: ${({ theme, header }) =>
    header ? theme.colors.black : theme.colors.greyishBlue};
  font-weight: ${({ header }) => (header ? 'bold' : 'normal')};
  height: fit-content;
`
