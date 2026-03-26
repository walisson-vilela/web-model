import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0;
`

export const Title = styled.div`
  padding: 14px 0;
  margin: 0 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  strong {
    flex: 1;
    font-size: 17px;
    font-weight: bold;
    text-align: left;
  }

  div {
    width: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  img {
    cursor: pointer;
  }
`
export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    strong {
      font: normal normal 600 14px/17px 'Lato';

      & + strong {
        border-bottom: 1px solid #000;
        margin-top: 4px;
      }
    }
  }

  .modalWidget14 {
    width: 300px;
    height: 180px;
    margin: 0 20px;
  }
`
export const RightContent = styled(LeftContent)`
  div {
    strong {
      margin: 0 4px;
    }
  }
`
export const Icons = styled.div`
  width: 100%;
  max-width: 209px;
  height: 38px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  bottom: 24px;
`

export const Percentage = styled.strong`
  position: relative;
  bottom: 40px;
  font-size: 17px;
  font-weight: bold;
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    color: #6b7686;
  }

  & + div {
    padding-left: 10px;
  }
`
