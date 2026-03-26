import styled from 'styled-components'

export const Container = styled.div`
 width:100%;
 min-width:281px;
 padding: 14px;
 height:142px;
 background-color: #F5F5F5;
 margin-top: 5px;
 opacity: 1;
 box-shadow: 0px 3px 6px #0000001A;
 border-radius: 5px;
 padding:6px;
 display:flex;
 flex-direction:column;
 justify-content:space-between;

header{
display:flex;
flex-direction:column;

div{
    width: 169px;
    height: 10px;
    background: #EBEBEB 0% 0% no-repeat padding-box;
    border: 1px solid #DEDEDE5E;
    opacity: 1;
    margin-top:4px;
}

}
footer{
    width: 100%
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    div{
    width: 169px;
    height: 10px;
    background: #EBEBEB 0% 0% no-repeat padding-box;
    border: 1px solid #DEDEDE5E;
    opacity: 1;
    margin-top:4px;
}


}

`
