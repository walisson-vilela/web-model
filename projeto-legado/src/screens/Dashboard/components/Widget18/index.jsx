import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Widget18Failure, Widget18Request, Widget18Sucess } from '../../../../redux/actions/WidgetAction';
import api from '../../../../services/Axios';
import { firstDayWeek, lastDayWeek } from '../../helpers/getCurrentWeek';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading';
import { Container } from './styles';

export function Widget18(){
    const {isError} = useSelector((state) => state.Loading)
    const [loading,setLoading] = useState(true)
    const dispatch = useDispatch();
    const options ={
        chart: {
            type: 'bar',
            backgroundColor:null
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },

        yAxis: {

             labels:{
                 enabled:true,
                 format:'{}'
             },
            title: false,
        },
        legend: {
            reversed: true
        },
        colors: ['#66BB6A', '#E23851','#66BB6A', '#E23851'],
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'TMO -',
            data: [30,10]
        }, {
            name: 'TMO+',
            data:[1,3]
        }]
    }

    useEffect(() =>{
    async function loadData(){
        dispatch(Widget18Request())
            try{
                const response = await api.get(`/v1/widgets/stats/18?parents%5B%5D=13&start=${firstDayWeek}&end=${lastDayWeek}`)
                setLoading(false)
                dispatch(Widget18Sucess())
                setLoading(false)
            }catch(error){
             dispatch(Widget18Failure())
            }
        }
        loadData()
},[])

    return(
     <Container>
      <AiOutlineExpandAlt size={20} color="#000"/>
      <Error isError={isError}/>
      <InternalLoading  isLoading={loading}/>
         <strong> Raio X TMO S0</strong>
         <HighchartsReact
          Highcharts={Highcharts}
          options={options}
          containerProps={{ className: 'widget18'}}
         />
     </Container>
    )
}
