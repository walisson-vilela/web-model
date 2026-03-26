import styled, { css } from 'styled-components'

export const Container = styled.div`
  height: 438px;
  display: flex;
  flex-direction: column;

  > form {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

export const Header = styled.div`
  padding: 21px;
  font-size: 18px;
  font-weight: bold;
  background-color: #3455ab;
  color: white;
`

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s4};
  padding: ${({ theme }) => theme.spacings.s4};
`

export const Footer = styled.div`
  margin-top: auto;
  display: flex;
  gap: ${({ theme }) => theme.spacings.s3};
  padding: ${({ theme }) => theme.spacings.s3};
  justify-content: end;
  border-top: 1px solid ${({ theme }) => theme.colors.lightestGrey};
`

export const Error = styled.div`
  color: ${({ theme }) => theme.colors.warningRed};
  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  margin-top: ${({ theme }) => theme.spacings.s1};

  ${({ children }) =>
    !children &&
    css`
      :after {
        content: ' ';
        white-space: pre;
      }
    `}
`

export const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s6};

  > div {
    width: 50%;
  }
`
