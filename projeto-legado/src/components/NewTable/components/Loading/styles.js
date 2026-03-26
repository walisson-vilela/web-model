import styled, { keyframes } from 'styled-components'



const rotation = keyframes`
    to{
        transform: rotate(360deg);
    }

`

export const Container = styled.div`
 width: 40px;
 height:40px;
 margin:10px 0;
 border-radius:50%;
 border:6px solid #ccc;
 border-left-color: rgba(0,0,0,0.1);
 position:absolute;
 z-index:1;
 bottom:0;
 left:50%;
 animation: ${rotation} 1s linear infinite;

`
