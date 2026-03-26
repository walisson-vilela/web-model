import styled from 'styled-components';


export const Container = styled.div`
width:100%;
max-width:900px;
padding: 10px;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #0000001A;
margin-top: 15px;
height: 300px;
border-radius: 5px;
padding: 12px;
margin-right:13px;

strong{
    margin: 8px 0;
    font-size:15px;
    display:block;
}
.widget27{
    width: 820px;
    height:250px;
    margin-right:10px;
}
`

export const Content = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;

`

export const Buttons = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
margin-right: 20px;
width: 100px;


button{
    width:100%;
    height:35px;
    margin: 4px 0;
    border-radius: 8px;
    background:transparent;
    outline:0;
    border: 1px solid #3455AB;
    color:#fff;
    background:#3455AB;
    cursor:pointer;
    font-weight:medium;
}

`;

