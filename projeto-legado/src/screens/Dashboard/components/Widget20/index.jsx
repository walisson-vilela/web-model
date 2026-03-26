import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadingFailure, loadingRequest, loadingSucess } from '../../../../redux/actions/LoadingAction';
import api from '../../../../services/Axios';
import { firstDayWeek, lastDayWeek } from '../../helpers/getCurrentWeek';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading';
import { Container, Item, Itens } from './styles';

export function Widget20(){
    const [widget, setWidget] = useState({})
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const {isError} = useSelector((state) => state.Loading)

    useEffect(() =>{
        async function loadData(){
            dispatch(loadingRequest())
            try{
                const response = await api.post(`/v1/widgets/stats/20?parents%5B%5D=13`,{
                    start: firstDayWeek,
                    end: lastDayWeek
                })
                console.log(response.data)
                const {data} = response.data;
                setWidget(data);
                setLoading(false)
                dispatch(loadingSucess())
            }catch(error){
                dispatch(loadingFailure())
            }
        }
        loadData();
    },[])

    return(
        <Container>
            <Error isError={isError}/>
            <InternalLoading isLoading={loading}/>
            <header>
                <strong> {widget.total_stores} </strong>
                <span> PDVs cobertos(S0) </span>
            </header>
            <Itens>
                <Item>
                    <strong>{widget.stores}</strong>
                    <span> PDVs</span>
                </Item>
                <Item>
                    <strong> {widget.percentage}% </strong>
                    <span> Representação</span>
                </Item>
            </Itens>
        </Container>
    )
}
