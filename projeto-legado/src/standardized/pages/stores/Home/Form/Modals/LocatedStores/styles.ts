import styled from 'styled-components'

export const Subtitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;

  padding-bottom: ${({ theme }) => theme.spacings.s4};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  margin-bottom: ${({ theme }) => theme.spacings.s4};

  > div {
    display: flex;
    align-items: center;
    gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  }
`

export const PopupSubtitle = styled.div`
  font-weight: bold;
  margin-top: calc(${({ theme }) => theme.spacings.s1} * 1.5);
`
