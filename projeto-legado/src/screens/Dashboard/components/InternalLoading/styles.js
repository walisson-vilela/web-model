import styled, { keyframes } from 'styled-components';


export const Container = styled.div`
 position:absolute;
 width:100%;
 z-index:3;
 display:flex;
 flex-direction:column;
 justify-content:center;
 align-items:center;
 background:#fff;
 height:100%;




 p{
     font-size: 15px;
     line-height: 23px;
     font-weight:medium;
     color:#263046B3;
     width:100%;
     max-width:180px;
     text-align:center;
     margin-top:8px;
 }
`


const Rotate = keyframes`
 to{
     transform: rotate(360deg);
 }

`
export const Spinner = styled.div`
 width:40px;
 height:40px;
 border: 8px solid rgba(0,0,0, .1);
 border-left: 8px solid #1E63A3;
 border-radius:50%;
 animation: ${Rotate} 1s linear infinite;
`
