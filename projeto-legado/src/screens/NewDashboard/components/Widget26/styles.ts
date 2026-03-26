import styled from 'styled-components'

export const Container = styled.div`
width: 100%;
max-width: 325px;
height: 269px;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #0000001a;
border-radius: 5px;
opacity: 1;
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
-webkit-flex-direction: column;
-ms-flex-direction: column;
flex-direction: column;
padding: 14px;
margin-left: 8px;

.header{
    width:100%;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
}
.wrapper{
    width:50px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    a, svg{
        cursor:pointer;
    }
    svg{
     position: relative;
     bottom: 2px;
}
    }
}
strong{
 font: normal normal bold 14px/17px 'Lato';
 letter-spacing: 0px;
 color: #000000;
 opacity: 1;
 padding: 3px 6px;
}
span{
    color:grey;
    padding:3px 10px;
}
.widget24{
    width:100%;
    height:240px;
}

`
