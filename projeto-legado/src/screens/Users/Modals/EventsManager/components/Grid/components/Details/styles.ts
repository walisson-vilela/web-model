import styled from 'styled-components'

export { EmptyMessage } from '../../../../styles'

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  justify-content: center;
  overflow: hidden;
`

export const Card = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  border: ${({ theme }) => `1px solid ${theme.colors.lightestGrey}`};
  width: 100%;
  padding: ${({ theme }) => theme.spacings.s3};
  box-sizing: border-box;
  position: relative;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.darkBlue};

  > div {
    display: flex;
    flex-direction: column;
    gap: calc(${({ theme }) => theme.spacings.s1} / 2);
    justify-content: center;
    overflow: hidden;

    /* Tipo e Origem */
    :nth-child(1) {
      flex: 1;
      > div {
        display: flex;
        gap: ${({ theme }) => theme.spacings.s1};
      }
    }

    /* Anexo */
    :nth-child(2) > a {
      display: flex;
      gap: calc(${({ theme }) => theme.spacings.s1} / 2);
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.colors.blue};
      :hover {
        text-decoration: underline;
      }
    }

    /* Anexo e Status */
    :nth-child(3) {
      text-align: center;
      ${({ theme }) => theme.useTypography('p')}
      line-height: 17px;

      .red {
        color: ${({ theme }) => theme.colors.warningRed};
      }
      .blue {
        color: ${({ theme }) => theme.colors.blue};
      }
    }
  }

  &.history {
    /* Anexo */
    > div:nth-child(2):has(a) {
      min-width: 30%;
      max-width: 30%;
    }

    /* Status */
    > div:nth-child(3) {
      min-width: 30%;
      max-width: 30%;
      border-left: ${({ theme }) => `1px solid ${theme.colors.lightestGrey}`};
      padding-left: ${({ theme }) => theme.spacings.s1};
    }
  }

  &.future {
    /* Anexo */
    > div:nth-child(2):has(a) {
      min-width: 20%;
      max-width: 20%;
    }

    /* Status */
    > div:nth-child(3) {
      min-width: 20%;
      max-width: 20%;
    }
  }
`
