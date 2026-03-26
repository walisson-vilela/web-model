import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Widget31Failure, Widget31Request, Widget31Sucess } from '../../../../redux/actions/WidgetAction';
import api from '../../../../services/Axios';
import { currentDate } from '../../helpers/getCurrentDate';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading';
import { Container } from './styles';

export function Widget31(){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const {isError} = useSelector((state) => state.Loading)
    const options ={
        credits: {
            enabled: false,
            backgroundColor:null,
       },
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: ['Dom', 'Seg','Ter', 'Qua','Qui','Sex', 'Sab'],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    fontWeight:'bold',
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'TMO',
                style: {
                    color: Highcharts.getOptions().colors[1],
                    fontWeight:'bold'
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Performance',
                style: {
                    color: '#000',
                    fontWeight:'bold'
                }
            },

            labels: {
                format: '{value}',
                style: {
                    color: '#000',
                    fontWeight:'bold'
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'horizontal',
            align: 'left',
            x: 60,
            verticalAlign: 'top',
            y: 183,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'TMO',
            type: 'column',
            yAxis: 1,
            data: [],

        }, {
            name: 'Performance',
            type: 'spline',
            data: [],

        }],
        colors:['#1E63A3','#66BB6A'],
    }



    useEffect(() =>{
     async function loadData(){
        dispatch(Widget31Request())
         try{
             const response = await api.get(`/v1/widgets/stats/30?date=${currentDate}&parents%5B%5D=13`)
             const {data} = response.data;
             console.log('Widget31',data);

             setLoading(false)
             dispatch(Widget31Sucess())
         }catch(error){
         dispatch(Widget31Failure())
         }
        }
        loadData()
    },[])
    return(
     <Container>
         <Error isError={isError}/>
         <InternalLoading  isLoading={loading}/>
         <h1> Performance de Atendimento vs Media Móvel 21 dias</h1>
         <HighchartsReact
            Highcharts={Highcharts}
            options={options}
            containerProps={{ className: 'widget31'}}
         />
     </Container>
    )
}

