import styled from 'styled-components'

export const Container = styled.div`
  width: 19%;
  padding: 14px;
  height: 288px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 5px;
  opacity: 1;
  padding: 14px;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    strong {
      span {
        font-size: 10px;
      }
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 50px;
      svg {
        cursor: pointer;
        position: relative;
        bottom: 2px;
      }
    }
  }

  .widget30 {
    height: 200px;
  }
`
