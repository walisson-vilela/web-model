import styled from 'styled-components'

export const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  background-color: #3455ab;
  padding: 21px;

  & > span {
    font: normal normal bold 18px/20px Lato;
    color: #ffffff;
  }
`

export const Container = styled.div`
  width: 100%;
  height: 472px;
  display: flex;
  flex-direction: column;
  padding: 21px;
  gap: 21px;
`

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    font: normal normal 600 16px/24px Lato;
    color: #263046cc;

    & > strong {
      font: normal bold 600 16px/24px Lato;
      color: #263046cc;
    }
  }
`

export const InfoInputsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`

export const More = styled.div`
  width: 35px;
  height: 35px;

  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
`
