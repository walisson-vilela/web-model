import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Widget22Failure, Widget22Request, Widget22Sucess } from '../../../../redux/actions/WidgetAction';
import api from '../../../../services/Axios';
import { currentDate } from '../../helpers/getCurrentDate';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading';
import { Container, Item, Itens } from './styles';

export function Widget22(){
    const {isError} = useSelector((state) => state.Loading)
    const dispatch = useDispatch()
    const [widget, setWidget ] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        async function loadData(){
            dispatch(Widget22Request())
            try{
                const response = await api.get(`/v1/widgets/stats/22?parents%5B%5D=13&date=${currentDate}`)
                const {data} = response.data;
                setWidget(data)
                setLoading(false)
                dispatch(Widget22Sucess())
            }catch(error){
                dispatch(Widget22Failure())
            }
        }
        loadData()
    },[])
    return(
        <Container>
            <Error isError={isError}/>
            <InternalLoading isLoading={loading}/>
            <header>
                <strong> {widget.total_routes}</strong>
                <span> Qtd.Roteiro(SO) </span>
            </header>
            <Itens>
                <Item>
                    <strong> {widget.routes} </strong>
                    <span> Rotas</span>
                </Item>
                <Item>
                    <strong> {widget.percentage}% </strong>
                    <span> Representação</span>
                </Item>
            </Itens>
        </Container>
    )
}
