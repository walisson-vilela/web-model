import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  color: ${({ theme }) => theme.colors.white};

  > div {
    :nth-child(1) {
      ${({ theme }) => theme.useTypography('h2')};
      line-height: 21px;
    }

    :nth-child(2) {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacings.s3};

      > div {
        ${({ theme }) => theme.useTypography('p')};
        line-height: 17px;

        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacings.s1};

        ul,
        ol {
          margin: 0;
          padding: 0 0 0 ${({ theme }) => theme.spacings.s3};

          display: flex;
          flex-direction: column;
          gap: ${({ theme }) => theme.spacings.s1};

          > li {
            padding-left: calc(${({ theme }) => theme.spacings.s1} / 2);

            ${({ theme }) => theme.useTypography('p')};
            line-height: 17px;

            > div {
              display: flex;
              flex-direction: column;
              gap: ${({ theme }) => theme.spacings.s1};
            }
          }
        }

        > ul > li {
          ::marker {
            content: '-';
          }
        }

        ol {
          list-style-type: lower-latin;
          counter-reset: list;

          > li {
            list-style: none;
            counter-increment: list;

            ::marker {
              content: counter(list, lower-latin) ')';
            }
          }
        }
      }
    }
  }
`

export const RangeContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s3};
  margin: ${({ theme }) => theme.spacings.s4} 0
    ${({ theme }) => theme.spacings.s3} 0;

  > div {
    flex: 1;
    display: flex;
  }
`

export const MinMax = styled.div<{ $color?: 'red' | 'green' }>`
  position: relative;
  width: 28px;
  text-align: center;

  :after {
    content: '';
    position: absolute;
    top: -${({ theme }) => theme.spacings.s3};
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + ${({ theme }) => theme.spacings.s5});
    border-width: 2px;
    border-style: solid;

    border-color: ${({ $color }) => $color || 'transparent'};
  }
`

export const Bullet = styled.div<{
  $color: 'blue' | 'white'
  $offset?: number
}>`
  position: relative;

  flex: 1;

  :before {
    content: '';
    width: 100%;
    height: 2px;
    ${({ theme, $offset: offset }) =>
      offset
        ? css`
            background-image: linear-gradient(
              90deg,
              ${theme.colors.blue} ${offset}%,
              ${theme.colors.white} ${offset}%
            );
          `
        : css`
            background-color: ${theme.colors.white};
          `}

    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }

  :after {
    content: '';

    width: ${({ theme }) => theme.spacings.s3};
    height: ${({ theme }) => theme.spacings.s3};
    border: 1px solid ${({ theme }) => theme.colors.white};
    border-radius: 100%;

    position: absolute;
    top: calc(50% - ${({ theme }) => theme.spacings.s1} - 0.5px);
    left: ${({ theme, $offset: offset }) =>
      offset ? `calc(${offset}% - ${theme.spacings.s3} / 2)` : 0};

    background-color: ${({ theme, $color: color }) => theme.colors[color]};
  }

  > div {
    position: absolute;
    width: 80px;
    padding: ${({ theme }) => theme.spacings.s1};
    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;

    bottom: calc(100% + ${({ theme }) => theme.spacings.s1} + 4px);
    left: ${({ $offset: offset }) => (offset ? `calc(${offset}% - 40px)` : 0)};

    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      :nth-child(1),
      :nth-child(3) {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        ${({ theme }) => theme.useTypography('h4')}
        line-height: 17px;

        width: calc(${({ theme }) => theme.spacings.s3} + 1px);
        height: calc(${({ theme }) => theme.spacings.s3} + 1px);

        border-radius: 100%;
        border: 1px solid ${({ theme }) => theme.colors.white};
        padding-bottom: 2.2px;
      }
    }

    :after {
      content: '';
      position: absolute;
      left: calc(50% - 4.9px);
      bottom: -4px;
      transform: rotate(45deg);
      width: 9.9px;
      height: 9.9px;
      background-color: ${({ theme }) => theme.colors.blue};
      z-index: 2;
    }
  }
`
