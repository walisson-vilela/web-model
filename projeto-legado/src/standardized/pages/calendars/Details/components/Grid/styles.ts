import styled from 'styled-components'

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacings.s3};
  padding-right: 0;
  background-image: ${({ theme }) => {
    const color = theme.getColor('lightestGrey', 80)
    return `linear-gradient(${color}, ${color})`
  }};
  background-size: 1px calc(100% - ${({ theme }) => theme.spacings.s3} * 2);
  background-repeat: no-repeat;
  /** padding-left + checkbox-width / 2 - line-width / 2 */
  background-position-x: calc(
    ${({ theme }) => theme.spacings.s3} + 17px / 2 - 1px / 2
  );
  background-position-y: ${({ theme }) => theme.spacings.s3};

  display: flex;
  flex-direction: column;
`
