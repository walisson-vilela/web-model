import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 14px;

  .defaultModal {
    width: 100%;
    height: 400px;
  }
`
export const Title = styled.div`
  strong {
    font-size: 17px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 16px;
    display: inline-block;
  }
  span {
    color: grey;
    padding: 3px 10px;
  }

  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .widget31 {
    width: 750px;
    height: 210px;
  }
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  width: 100px;
  button {
    width: 100%;
    height: 30px;
    margin: 4px 0;
    background: #fff;
    border: 1px solid #1e63a3;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
  }
`
