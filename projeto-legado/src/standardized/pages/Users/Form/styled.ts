import styled, { css } from 'styled-components'

export { default as EmptyMessage } from '../../../components/EmptyMessage'
export { Section, Subtitle, Title } from '../../../components/form/components'

export const Link = styled.div`
  ${({ onClick, theme }) => {
    return onClick
      ? css`
          cursor: pointer;
          :hover {
            color: ${theme.colors.blue};
          }
        `
      : css`
          opacity: 0.5;
        `
  }}
`

export const Option = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  overflow: hidden;

  > div {
    :nth-child(1) {
      ${({ theme }) => theme.useTypography('p')}
      line-height: 17px;
      color: ${({ theme }) => theme.colors.darkSilver};
    }
    :nth-child(2) {
      ${({ theme }) => theme.useTypography('h6')}
      line-height: 16px;
      color: ${({ theme }) => theme.getColor('greyishBlue', 70)};

      display: flex;
      gap: calc(${({ theme }) => theme.spacings.s1} / 2);
      white-space: nowrap;
    }
  }
`

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};

  color: ${({ theme }) => theme.colors.bronze};
  border: 1px solid ${({ theme }) => theme.colors.vanilla};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.floralWhite};
  padding: ${({ theme }) => ` ${theme.spacings.s4} ${theme.spacings.s5}`};

  width: 100%;

  > :nth-child(1) {
    ${({ theme }) => theme.useTypography('h1', { fontWeight: 'bold' })}
    line-height: 22px;
  }
  > :nth-child(2) {
    ${({ theme }) => theme.useTypography('p')}
    line-height: 24px;
    color: ${({ theme }) => theme.getColor('bronze', 80)};
  }
`
