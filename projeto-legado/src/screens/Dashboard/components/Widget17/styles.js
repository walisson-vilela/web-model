import styled from 'styled-components'

export const Container = styled.div`
width: 253px;
height: 104px;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #0000001A;
border-radius: 5px;
opacity: 1;
display:flex;
flex-direction:column;
align-items:flex-start;
justify-content:center;
padding: 0 10px;
margin-bottom: 10px;
position:relative;
h1{
    text-align: left;
    font: normal normal bold 14px/17px 'Lato';
    letter-spacing: 0px;
    color: #000;
    opacity: 1;
}

strong{
text-align: left;
font: normal normal 900 22px/27px Lato;
letter-spacing: 0px;
color: #505D6F;
opacity: 1;
}

svg{
     position:absolute;
     z-index:3;
     top:5px;
     right:5px;
     cursor:pointer;
 }
`
