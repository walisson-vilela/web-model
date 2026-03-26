import styled from 'styled-components';


export const Container = styled.div`
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #0000001A;
border-radius: 5px;
opacity: 1;
display:flex;
flex-direction:column;
width:315px;
height:300px;
padding:12px;
margin-right:10px;
position:relative;


header{
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    strong{
        font-size: 15px;


        &+ strong{
            font-size: 14px;
        }
    }

}

.widget30{
    width:280px;
    height: 270px;
}
`

