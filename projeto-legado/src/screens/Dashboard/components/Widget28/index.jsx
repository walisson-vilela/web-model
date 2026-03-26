import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Widget28Failure, Widget28Request, Widget28Sucess } from '../../../../redux/actions/WidgetAction';
import api from '../../../../services/Axios';
import { currentDate } from '../../helpers/getCurrentDate';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading';
import { Container } from './styles';




export function Widget28(){
    const dispatch = useDispatch();
    const {isError} = useSelector((state) => state.Loading)
    const [loading, setLoading] = useState(true)
    const [inside, setInside] = useState(0);
    const [outside, setOutside] = useState(0)
    const options ={
        chart: {
            type: 'pie',
            backgroundColor:null,
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
       },

        accessibility: {
            announceNewData: {
                enabled: true
            },
            point: {
                valueSuffix: '%'
            }
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            },
            pie:{
                size:'70%',
            }
        },

        innerSize: 100,
        colors: ['#66BB6A','#E23851'],
        series: [
            {
                name: "",
                colorByPoint: true,
                data: [
                    {
                        name: "Dentro",
                        y: 0,
                        drilldown: "Para dentro"
                    },

                    {
                        name: "Fora",
                        y: 0,
                        drilldown: "Para fora"
                    }
                ]

            }]
    }

    useEffect(() =>{
        async function loadData(){
            dispatch(Widget28Request())
            try{
                const response = await api.get(`/v1/widgets/stats/28?date=${currentDate}&parents%5B%5D=13`)
                const {data} = response.data
                setInside(data.chart.series[0].data[0].y)
                setOutside(data.chart.series[0].data[1].y)
                setLoading(false)
                dispatch(Widget28Sucess())
            }catch(error){
                dispatch(Widget28Failure())
            }
        }

        loadData()
    },[])
    options.series[0].data[0].y =inside
    options.series[0].data[1].y = outside
    return(
        <Container>
            <Error isErro={isError}/>
            <InternalLoading isLoading={loading}/>
            <strong> % Range Quality</strong>
            <HighchartsReact
              Highcharts={Highcharts}
              options={options}
              containerProps={{ className: 'widget28'}}
            />

        </Container>
    )
}
