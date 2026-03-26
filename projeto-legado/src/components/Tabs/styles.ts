import styled from 'styled-components'

export const Tabs = styled.nav`
  border-bottom: 1px solid #d6d6d654;
  margin-bottom: ${({ theme }) => theme.spacings.s4};

  > div {
    display: flex;
    gap: ${({ theme }) => theme.spacings.s6};

    > div {
      padding: ${({ theme }) => theme.spacings.s3};
      border-radius: 4px 4px 0 0;

      width: 174px;

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;

      color: #263046;
      font-size: ${({ theme }) => theme.spacings.s3};
      line-height: 17px !important;
      font-weight: bold;

      &.active {
        background-color: #3455ab;
        color: white;
      }
    }
  }
`
