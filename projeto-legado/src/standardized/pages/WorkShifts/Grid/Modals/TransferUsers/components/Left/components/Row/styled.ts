import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  gap: calc((${({ theme }) => theme.spacings.s1} / 2));
  padding: ${({ theme }) => `0 ${theme.spacings.s2}`};
  box-sizing: border-box;
  cursor: pointer;
`

export const RowTitle = styled(MwEllipsisContainer)`
  ${({ theme }) => theme.useTypography('h5')};
  color: ${({ theme }) => theme.colors.greyishBlue};
`

export const RowSubtitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  ${({ theme }) => theme.useTypography('p')};
  color: ${({ theme }) => theme.getColor('greyishBlue', 50)};
`
export const RowSubtitleItem = styled.div`
  display: flex;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
`
