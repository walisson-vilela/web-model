import styled from 'styled-components'

export const NameContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s1};
  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
`

export const RoleContainer = styled.div`
  margin-bottom: calc(${({ theme }) => theme.spacings.s1} / 2);
  ${({ theme }) => theme.useTypography('p')}
  font-size: 12px;
  line-height: 15px;

  > div:nth-child(1) {
    flex: 1;
  }
`

export const TimeContainer = styled.div`
  ${({ theme }) => theme.useTypography('p')}
  font-size: 12px;
  line-height: 15px;
`

export const UserContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s3};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacings.s3};
  display: flex;
  align-items: center;
  border: 1px solid #e5e5e5;

  white-space: nowrap;

  > div {
    display: flex;
    flex-direction: column;

    :nth-child(2) {
      flex: 1;
      overflow: hidden;

      > div {
        display: flex;
        gap: calc(${({ theme }) => theme.spacings.s1} / 2);
        overflow: hidden;
      }
    }
  }

  span,
  b {
    color: ${({ theme }) => theme.colors.greyishBlue};
  }
`

export const Container = styled.div`
  position: absolute;
  height: 100%;
  --width: 340px;
  width: var(--width);
  top: 0;

  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  box-shadow: inset 0px 3px 6px #e6e6e629, 0px 2px 4px #4d4d4d29;
  border-width: 0 0 1px 1px;
  border-style: solid;
  border-color: #e5e5e5;

  overflow: hidden;

  &.active {
    right: 0;
  }
  &:not(.active) {
    right: calc((var(--width) + 10px) * -1);
  }

  transition: 0.25s right ease-in-out;
  padding: ${({ theme }) => `${theme.spacings.s4} 0 0 ${theme.spacings.s1}`};

  div:has(${UserContainer}) {
    gap: ${({ theme }) => theme.spacings.s3};
  }
`

export const Title = styled.span`
  ${({ theme }) => theme.useTypography('h1')}
  line-height: 24px;
  color: ${({ theme }) => theme.colors.greyishBlue};
  padding: ${({ theme }) =>
    `0 ${theme.spacings.s3} ${theme.spacings.s3} ${theme.spacings.s1} `};
  border-bottom: 1px solid #e6e6e6;
`

export const CloseContainer = styled.div`
  padding: ${({ theme }) => theme.spacings.s3};
  display: flex;
  justify-content: center;
  > button {
    ${({ theme }) => theme.useTypography('h3')}
    line-height: 19px;
    color: ${({ theme }) => theme.colors.greyishBlue};
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
`
