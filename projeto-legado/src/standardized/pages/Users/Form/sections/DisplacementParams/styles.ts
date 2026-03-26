import styled from 'styled-components'

export * from '../../styled'

export const WarningBox = styled.div`
  /* TODO: use theme color */
  background-color: #fdf0bf;
  padding: ${({
    theme: {
      spacings: { s1, s3 },
    },
  }) => `${s1} ${s3}`};

  ${({ theme }) => theme.useTypography('h6')}
  line-height: 16px;
`
