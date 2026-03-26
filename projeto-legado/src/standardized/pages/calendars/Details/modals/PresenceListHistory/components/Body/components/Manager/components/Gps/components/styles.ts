import styled from 'styled-components'

export const PopupWrapper = styled.div`
  padding: ${({ theme }) => theme.spacings.s3}
    ${({ theme }) => theme.spacings.s4};

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    > li {
      padding-block: ${({ theme }) => theme.spacings.s3};
      display: grid;
      gap: 5px;
      grid-template-columns: 1fr 30px;

      &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};
      }

      div:nth-child(2) {
        display: grid;
        place-items: Center;
      }
    }
  }
`
