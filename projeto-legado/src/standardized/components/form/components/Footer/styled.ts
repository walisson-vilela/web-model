import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s6};
  padding: ${({
    theme: {
      spacings: { s3 },
    },
  }) => `${s3} 0 0 ${s3}`};
  box-shadow: 0px 5px 0px ${({ theme }) => theme.colors.white};

  margin-left: auto;
  background-color: ${({ theme }) => theme.colors.white};
  position: sticky;
  bottom: 1px;
  right: 0;
  width: min-content;
  box-sizing: border-box;
  z-index: 2;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  color: ${({ theme }) => theme.colors.greyishBlue};
  float: left;
`

export const FooterContainer = styled.div`
  display: contents;
`
