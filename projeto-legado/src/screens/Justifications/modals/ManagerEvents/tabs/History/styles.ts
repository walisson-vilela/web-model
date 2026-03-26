import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px solid #e2e2e3;
  border-radius: 4px;
`

export const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const ListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  & > div {
    width: 100%;

    & > div {
      border: none;
      border-bottom: 1px solid #e2e2e3;

      & > :last-child {
        flex: 1;

        & > :first-child {
          flex: 1;
          & > div {
            width: 100% !important;

            & > div {
              width: 100% !important;
            }
          }
        }
      }
    }
  }
`

export const ListContent = styled.div`
  width: 100%;
  height: 290px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  overflow-x: hidden;
  overflow-y: auto;
`
