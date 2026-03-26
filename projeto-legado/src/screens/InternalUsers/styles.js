import styled from 'styled-components';

export const Content = styled.div`
 display:flex;
 align-items:center;
 justify-content:center;
 margin: 0 auto;
 width:60px;
 text-align:center;

 span{
    color: #263046;
 }

 div{
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #B2B2B2;
  margin-left:4px;
  margin-top:1px;

 }

`

export const ContentIcon = styled.div`
 width:100%;
 display:flex;
 flex-direction:row;
 align-items:center;
 justify-content:center;
 padding-right: 12px;

  div{
      width:6px;
      height: 6px;
      background: #66BB6A 0% 0% no-repeat padding-box;
      border-radius:50%;
      margin-right:4px;
  }
`
