import styled from 'styled-components'

export const SearchContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacings.s3};
  margin-bottom: ${({ theme }) => theme.spacings.s1};

  ${({ theme }) => theme.useTypography('p')}

  position: relative;

  > input {
    width: 100%;
    min-height: 35px;

    padding-top: 0;
    /* padding + icon width + gap */
    padding-right: calc(
      ${({ theme }) => `${theme.spacings.s1} + 24px + ${theme.spacings.s1}`}
    );
    padding-bottom: 0;
    padding-left: ${({ theme }) => theme.spacings.s3};

    outline: none;

    border-style: solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 4px;
  }

  > :last-child {
    position: absolute;
    top: 50%;

    /* parent padding + input padding */
    right: calc(
      ${({ theme }) => `${theme.spacings.s3} + ${theme.spacings.s1}`}
    );
    transform: translateY(-50%);
  }
`
