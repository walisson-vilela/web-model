import styled from 'styled-components'

export const Container = styled.div`
  position: relative;

  :after {
    content: attr(data-count);
    position: absolute;

    width: 19px;
    height: 19px;
    right: -9.5px;
    top: -9.5px;

    border-radius: 100%;

    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};

    ${({ theme }) => theme.useTypography('h6')};
    line-height: 16px;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    transition-property: width height right top;
    transition-timing-function: linear;
    transition-duration: 0.25s;
  }
  :not([data-count]):after {
    width: 0;
    height: 0;
    right: 0;
    top: 0;
  }
`
