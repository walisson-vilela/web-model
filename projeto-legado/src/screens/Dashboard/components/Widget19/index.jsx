import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Widget19Failure, Widget19Request, Widget19Sucess } from '../../../../redux/actions/WidgetAction';
import api from '../../../../services/Axios';
import { currentDate } from '../../helpers/getCurrentDate';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading';
import { Container, Item, Itens } from './styles';


export function Widget19(){
    const [loading, setLoading] = useState(true)
    const [widget, setWidget] = useState({})
    const dispatch = useDispatch()
    const {isError} = useSelector((state) => state.Loading)

    useEffect(() =>{
        async function loadData(){
            dispatch(Widget19Request())
            try{
                const response = await api.get(`/v1/widgets/stats/19?parents%5B%5D=13&date=${currentDate}`)
                const {data} = response.data
                setWidget(data);
                dispatch(Widget19Sucess())
                setLoading(false)
            }catch(errror){
             dispatch(Widget19Failure())
            }
        }
        loadData()
    },[])

    return(
        <Container>
         <Error isError={isError}/>
         <InternalLoading isLoading={loading}/>
            <header>
                <strong> {widget.total_actives}</strong>
                <span> Promotor Ativos </span>
            </header>
            <Itens>
                <Item>
                    <strong> {widget.actives} </strong>
                    <span> Ativos</span>
                </Item>
                <Item>
                    <strong> {widget.percentage}% </strong>
                    <span> Representação</span>
                </Item>
            </Itens>
        </Container>
    )
}
