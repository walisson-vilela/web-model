import styled from 'styled-components'

export const HierarchyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};
  margin-top: ${({ theme }) => theme.spacings.s4};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  padding-bottom: ${({ theme }) => theme.spacings.s3};

  span {
    ${({ theme }) => theme.useTypography('h3')}
    color: ${({ theme }) => theme.getColor('greyishBlue', 70)};
  }

  .title {
    ${({ theme }) => theme.useTypography('h2')}
  }
`

export const HierarchyMain = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const EmptyMessage = styled.span`
  color: #a6acb1cc;
  ${({ theme }) => theme.useTypography('h4')};
  font-weight: normal;
  line-height: 17px;
  margin: auto;
`

export const HierarchyBody = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`

export const UsersContainer = styled.div`
  margin-left: auto;
  border-left: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  padding: 0 ${({ theme }) => theme.spacings.s1};

  svg {
    max-width: 20px;
    max-height: 20px;
  }

  svg,
  svg * {
    stroke-width: 0;
    fill: #7d7d7d;
  }

  &:not([data-count]) {
    opacity: 0.5;
  }

  &:not([data-count]):after {
    content: '';
    top: calc(${({ theme }) => theme.spacings.s1} * 1.5 + 8.5px);
    right: 8.5px;

    width: 0;
    height: 0;
    border-width: 0px;
  }

  &[data-count]:after {
    content: attr(data-count);
    top: calc(${({ theme }) => theme.spacings.s1} * 1.5);
    right: 0px;

    width: 17px;
    height: 17px;
    border-width: 1px;
  }

  &:after {
    position: absolute;
    transition-property: top right width height border-width;
    transition-timing-function: linear;
    transition-duration: 0.5s;
    overflow: hidden;

    border-radius: 100%;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.darkBlue};

    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};

    font-size: 9px;
    line-height: 11px;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`
