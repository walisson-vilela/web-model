import styled from 'styled-components'

export const Container = styled.div`
  width: 519px;
  height: 244px;
`
export const Header = styled.div`
  height: 50px;
  width: 100%;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightestGrey}`};
  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};
`
export const Title = styled.div`
  ${({ theme }) => theme.useTypography('p')};
  line-height: 20px;
  font-size: 18px;
  font-weight: bold;
  height: 22px;
`
export const Body = styled.div`
  height: 121px;
  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightestGrey}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
`
export const Footer = styled.div`
  padding: ${({ theme }) => `18px ${theme.spacings.s4}`};
  display: flex;
  justify-content: flex-end;
  gap: 45px;
  height: 74px;
`
