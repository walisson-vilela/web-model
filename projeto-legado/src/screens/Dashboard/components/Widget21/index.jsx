import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Widget21Failure, Widget21Request, Widget21Sucess } from '../../../../redux/actions/WidgetAction';
import api from '../../../../services/Axios';
import { currentDate } from '../../helpers/getCurrentDate';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading';
import { Container, Item, Itens } from './styles';


export function Widget21(){
    const {isError} = useSelector((state) => state.Loading)
    const [widget, setWidget] = useState({})
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    useEffect(() =>{
        async function loadData(){
            dispatch(Widget21Request())
            try{
                const response = await api.get(`/v1/widgets/stats/21?parents%5B%5D=13&date=${currentDate}`)
                const {data} = response.data;
                setWidget(data)
                setLoading(false)
                dispatch(Widget21Sucess())
            }catch(error){
                dispatch(Widget21Failure())
            }
        }
        loadData()
    },[])
    return(
        <Container>
            <Error  isError={isError}/>
            <InternalLoading isLoading={loading}/>
            <header>
                <strong> {widget.total_attendances}</strong>
                <span> Atend. Previsto(SO)</span>
            </header>
            <Itens>
                <Item>
                    <strong>  {widget.attendances}</strong>
                    <span> Atendimentos</span>
                </Item>
                <Item>
                    <strong> {widget.percentage}% </strong>
                    <span> Representação</span>
                </Item>
            </Itens>
        </Container>
    )
}
