import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsModules from 'highcharts/highcharts-more';
import pareto from 'highcharts/modules/pareto';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Widget24Failure, Widget24Request, Widget24Sucess } from '../../../../redux/actions/WidgetAction';
import api from '../../../../services/Axios';
import { currentDate } from '../../helpers/getCurrentDate';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading';
import { Container } from './styles';

HighchartsModules(Highcharts)
pareto(Highcharts)
export function Widget24(){
    const dispatch = useDispatch()
    const {isError} = useSelector((state) => state.Loading)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)


    const options ={
        credits: {
            enabled: false
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
            categories: [],
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
                text: '',
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
            data: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],

        }, {
            name: 'Performance',
            type: 'spline',
            data: [
                null,
                null,
                null,
                null,
                null,
                null,
                0,
                0,
                0,
                null,
                0
            ],

        }],
        colors:['#1E63A3','#66BB6A'],
    }

    useEffect(() =>{
        async function loadData(){
            dispatch(Widget24Request());
            try{
                const response = await api.get(`/v1/widgets/stats/24?date=${currentDate}&parents%5B%5D=13`)
                const {data} = response.data
                data.chart.xAxis[0].categories.map((item) =>{
                   categories.push(item)
                })
                dispatch(Widget24Sucess())
                setLoading(false)
            }catch(error){
                dispatch(Widget24Failure())
            }
        }
        loadData()
    },[])
    options.xAxis[0].categories = categories;
    return(
     <Container>
         <Error isError={isError}/>
         <InternalLoading isLoading={loading}/>
         <h1> Performance de Atendimento vs Media Móvel 21 dias</h1>
         <HighchartsReact
            Highcharts={Highcharts}
            options={options}
            containerProps={{ className: 'widget24'}}
         />
     </Container>
    )
}
