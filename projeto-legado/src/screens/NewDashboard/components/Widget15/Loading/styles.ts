import styled from 'styled-components'

export const Container = styled.div`
  width: 18%;
  height: 264px;
  background-color: #f5f5f5;
  opacity: 1;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 5px;
  margin: 0 8px;
  padding: 20px 16px;

  header {
    div {
      width: 89px;
      height: 10px;
      background: #ebebeb 0% 0% no-repeat padding-box;
      border: 1px solid #dedede5e;
      opacity: 1;

      & + div {
        min-width: 50px;
        margin-top: 7px;
      }
    }
  }

  section {
    min-width: 106px;
    height: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 14px;

    .section-wrapper {
      width: 100px;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-around;
      .pipe1 {
        width: 50px;
        height: 70%;
        background: #ebebeb 0% 0% no-repeat padding-box;
        margin: 0 16px;
      }
      .pipe2 {
        width: 50px;
        height: 100%;
        background: #ebebeb 0% 0% no-repeat padding-box;
        margin: 0 8px;
      }
    }
  }
`
