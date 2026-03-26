import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Widget30Failure, Widget30Request, Widget30Sucess } from '../../../../redux/actions/WidgetAction';
import api from '../../../../services/Axios';
import { currentDate } from '../../helpers/getCurrentDate';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading';
import { Container } from './styles';
export function Widget30(){
    const dispatch = useDispatch()
    const {isError} = useSelector((state) => state.Loading);
    const [loading, setLoading] = useState(true)
    const [range, setRange] = useState(0);
    const options ={
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            backgroundColor: null,
        },
        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 200,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'km/h'
            },
            plotBands: [{
                from: 0,
                to: 120,
                color: '#55BF3B' // green
            }, {
                from: 120,
                to: 160,
                color: '#DDDF0D' // yellow
            }, {
                from: 160,
                to: 200,
                color: '#DF5353' // red
            }]
        },

        series: [{
            name: 'Speed',
            data: [80],
            tooltip: {
                valueSuffix: ' km/h'
            }
        }]

    }

    useEffect(() =>{
        async function loadData(){
            dispatch(Widget30Request());
            try{
             const response = await api.get(`/v1/widgets/stats/30?date=${currentDate}&parents%5B%5D=13`)
             const {data} = response.data
             setRange(data.chart.series[0].data[0]);
             setLoading(false)
             dispatch(Widget30Sucess())
            }catch(error){
             dispatch(Widget30Failure())
            }
        }
        loadData()

    },[])

    options.series[0].data[0] = range;
    return(
        <Container>
            <Error isError={isError}/>
            <InternalLoading  isLoading={loading}/>
            <header>
                <strong>Velocidade Média </strong>
                <span> Deslocamento</span>
            </header>
            <HighchartsReact
             Highcharts={Highcharts}
             options={options}
             containerProps={{ className: 'widget30'}}
            />
        </Container>
    )

}
