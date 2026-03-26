import React, { useEffect, useState } from 'react';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Widget17Failure, Widget17Request, Widget17Sucess } from '../../../../redux/actions/WidgetAction';
import api from '../../../../services/Axios';
import { currentDate } from '../../helpers/getCurrentDate';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading/index';
import { Container } from './styles';



export function Widget17(){
    const {isError} =  useSelector((state) => state.Loading)
    const [loading, setLoading] = useState(true)
    const [tmo, setTmo] = useState({})
    const dispatch = useDispatch()





    useEffect(() =>{
        async function loadData(){
            dispatch(Widget17Request())
            try{
                const response = await api.get(`/v1/widgets/stats/17?date=${currentDate}&parents%5B%5D=13`)
                const {data} = response.data
                setTmo(data)
                dispatch(Widget17Sucess())
                setLoading(false)
            }catch(error){
                dispatch(Widget17Failure())
                console.log('Error')
            }

        }

        loadData()
    },[])

    return(
     <Container>
        <AiOutlineExpandAlt size={20} color="#000"/>
         <Error isError={isError}/>
         <InternalLoading isLoading={loading}/>
         <h1> TMO - Dia Atual </h1>
         <strong>{tmo.tmo} %</strong>
     </Container>
    )
}
