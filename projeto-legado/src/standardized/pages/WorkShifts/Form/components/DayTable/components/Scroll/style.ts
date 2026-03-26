import styled from 'styled-components'

export const ScrollWrapper = styled.div`
  display: flex;
  gap: 1px;

  height: 126px;
  overflow-y: auto;
  color: #000000cc;
`

export const ScrollItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s3} / 2);
  position: relative;

  ${({ theme }) => theme.useTypography('h5')}
  padding: ${({ theme }) => theme.spacings.s1};
  background: ${({ theme }) => theme.getColor('white')} 0% 0% no-repeat
    padding-box;

  box-shadow: 0px 3px 6px ${({ theme }) => theme.getColor('black', 25)};
  border: 1px solid #e6e6e7;
  border-radius: ${({ theme }) => theme.spacings.s1};

  > div:has(svg) {
    z-index: -1;
    display: none;
    position: absolute;
    inset: 0;
    transition: z-index 700ms ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: transparent;
    transition: background 400ms ease;
  }

  &:hover {
    > div:has(svg) {
      z-index: 2;
      display: grid;
      place-items: center;
    }

    &::after {
      background: #292929;
      opacity: 0.6;
    }
  }
`

export const ScrollColWrapper = styled.div`
  position: relative;
  flex: 1;

  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  flex: 1;
  padding: ${({ theme }) => theme.spacings.s1};
  background-color: ${({ theme }) => theme.getColor('white')};

  &[data-danger='true'] {
    background: #fce4e4;
  }

  &:has(span) {
    height: auto;
    display: grid;
    place-items: center;
    position: sticky;
    top: 0;
    span {
      ${({ theme }) => theme.useTypography('h6')};
      text-align: center;

      opacity: 0.5;
    }
  }
`
