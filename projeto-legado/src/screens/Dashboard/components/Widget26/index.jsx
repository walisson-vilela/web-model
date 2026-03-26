import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Widget26Failure, Widget26Request, Widget26Sucess } from '../../../../redux/actions/WidgetAction'
import api from '../../../../services/Axios'
import { currentDate } from '../../helpers/getCurrentDate'
import { Error } from '../Error'
import { InternalLoading } from '../InternalLoading'
import { Container, Content, Item, Itens } from './styles'
export function Widget26(){
    const {isError} = useSelector((state) => state.Loading)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [widget, setWidget] = useState({});


    useEffect(() =>{
        async function loadData(){
            dispatch(Widget26Request())
            try{
               const response =  await api.get(`/v1/widgets/stats/26?date=${currentDate}&parents%5B%5D=13`);
               const {data} = response.data;
               setWidget(data)
               setLoading(false)
               dispatch(Widget26Sucess())

            }catch(error){
                dispatch(Widget26Failure())
            }
        }
        loadData();
    },[])

    return(
     <>
        <Container>
        <InternalLoading isLoading ={loading}/>
        <Error isError={isError}/>
            <h1> Tempo Médio Atendimento </h1>
            <Content>
            <header>
                <strong> {widget.avg_duration}</strong>
                <span> Tempo Médio</span>
            </header>
            <Itens>
                <Item>
                    <strong> {widget.max_duration}</strong>
                    <span> Maior Tempo</span>
                </Item>
                <Item>
                    <strong> {widget.min_duration}</strong>
                    <span> Menor Tempo</span>
                </Item>
            </Itens>
            </Content>

        </Container>
     </>

    )
}
