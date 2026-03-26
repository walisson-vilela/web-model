import styled from 'styled-components'

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;

  > span {
    font-size: 16px;
    font-weight: bolder;
    color: #263046cc;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
  > div:nth-child(2) {
    overflow: hidden;
  }
`

export const Content = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
  border: ${({ theme }) => `1px solid ${theme.colors.lightestGrey}`};
  box-sizing: border-box;
`
