import styled from 'styled-components';


export const Container = styled.div`
width:100%;
max-width:900px;
padding: 10px;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #0000001A;
border-radius: 5px;
padding: 8px;
margin-right:13px;


h2{
    font-size: 15px;
}

.widget29{
    width: 700px;
    height:280px;
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

