import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  padding: ${({ theme }) => theme.spacings.s3};
  border: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  min-width: 205px;

  > {
    width: 100%;
  }
`

export const ItemsContainer = styled.div`
  padding-left: ${({ theme }) => theme.spacings.s1};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
`

export const Item = styled.div<{ active: 1 | 0 }>`
  padding-left: ${({ theme }) => theme.spacings.s1};

  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};

  border-left-width: 2px;
  border-left-style: solid;
  border-left-color: ${({ theme, active }) =>
    active ? theme.colors.greyishBlue : 'transparent'};

  transition-property: border-left-color;
  transition-timing-function: ease-in-out;
  transition-duration: 0.25s;

  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};

  > span {
    font-size: ${({ theme }) => theme.spacings.s3};
    line-height: 17px;
    vertical-align: middle;
  }
`

export const Counter = styled.div`
  background-color: ${({ theme }) => theme.colors.warningRed};
  color: white;
  font-weight: bolder;
  font-size: 12px;
  line-height: 12px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 2px;
`
