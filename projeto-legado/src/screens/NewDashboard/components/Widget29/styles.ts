import styled from 'styled-components'

export const Container = styled.div`

width:100%;
min-width:420px;
flex:1;
height: 269px;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #0000001A;
border-radius: 5px;
opacity: 1;
display:flex;
flex-direction:column;
padding:14px;
margin-left:4px;


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
    margin-bottom:4px;

    svg{
      bottom: 3px;
      position: relative;
      cursor: pointer;
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
.widget25{
    width:100%;
    height:240px;
}

`
