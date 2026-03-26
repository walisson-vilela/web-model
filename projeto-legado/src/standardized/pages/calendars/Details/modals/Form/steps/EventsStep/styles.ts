import styled from 'styled-components'

export const Container = styled.div`
  padding-top: ${({ theme }) => theme.spacings.s1};
  display: flex;
  gap: calc(${({ theme }) => theme.spacings.s1} * 0.75);
  flex: 1;
  overflow: hidden;

  > div {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacings.s3};
    padding-top: ${({ theme }) => theme.spacings.s1};
    padding-bottom: ${({ theme }) => theme.spacings.s3};

    :nth-child(1) {
      > div:nth-child(2) {
        padding: ${({
          theme: {
            spacings: { s1 },
          },
        }) => `calc(${s1} / 2) calc(${s1} / 2) ${s1} calc(${s1} / 2)`};

        > div {
          padding: 0;
        }
      }
    }

    :nth-child(2) {
      background-color: ${({ theme }) => theme.colors.lightestGrey};
      width: 1px;
      min-height: 100%;
      max-height: 100%;
    }

    :nth-child(3) {
      flex: 1;
    }

    > div {
      :nth-child(1) {
        ${({ theme }) => theme.useTypography('h4')};
        line-height: 17px;
        color: ${({ theme }) => theme.getColor('black', 80)};
        display: flex;
        justify-content: space-between;
      }
      :nth-child(2) {
        border: 1px solid ${({ theme }) => theme.colors.lightestGrey};
        border-radius: 4px 4px 0 0;
        flex: 1;
      }
      :nth-child(3) {
        display: flex;
        justify-content: end;
        margin-top: auto;
      }
    }
  }
`
