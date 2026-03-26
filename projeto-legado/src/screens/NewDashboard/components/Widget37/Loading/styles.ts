import styled from 'styled-components'

export const Container = styled.div`
  width: 19.5%;
  height: 288px;
  padding: 14px;

  background-color: #f5f5f5;
  opacity: 1;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 5px;
  padding: 6px;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: column;

    div {
      width: 89px;
      height: 10px;
      background: #e7e7e7 0% 0% no-repeat padding-box;
      border: 1px solid #dedede5e;
      opacity: 1;
    }
  }
  section {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
      width: 169px;
      height: 10px;
      background: #ebebeb 0% 0% no-repeat padding-box;
      border: 1px solid #dedede5e;
      opacity: 1;
      margin-top: 4px;
    }
  }
`
