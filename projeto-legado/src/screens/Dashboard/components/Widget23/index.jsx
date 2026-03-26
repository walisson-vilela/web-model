import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Widget23Failure, Widget23Request, Widget23Sucess } from '../../../../redux/actions/WidgetAction';
import api from '../../../../services/Axios';
import { currentDate } from '../../helpers/getCurrentDate';
import { Error } from '../Error';
import { InternalLoading } from '../InternalLoading';
import { Container } from './styles';


export function Widget23(){
 const dispatch = useDispatch()
 const { isError} = useSelector((state) => state.Loading)
 const [loading, setLoading] = useState(true)
 /*
 const options ={
    chart: {
        renderTo: 'container',
        type: 'column',
        backgroundColor:null,
    },
    title: {
        text: '',

    },
    credits: {
        enabled: false
   },

    tooltip: {
        shared: true
    },
    xAxis: {
        categories: [
        'Dom',
        'Seg',
        'Ter',
        'Qua',
        'Qui',
        'Sex',
        'Sab'
        ],
        crosshair: true,
    },
    yAxis: [{
        title: {
            text: 'TMO',
            style:{
                fontWeight:'bold'
            }
        }
    }, {
        title: {
            text: 'Performance',
            style:{
                fontWeight:'bold'
            }
        },
        minPadding: 0,
        maxPadding: 0,
        max: 100,
        min: 0,
        opposite: true,
        labels: {
            format: "{value}"
        }
    }],

    series: [{
        type: 'pareto',
        name: 'TMO',
        yAxis: 1,
        zIndex: 10,
        baseSeries: 1,
        tooltip: {
            valueDecimals: 2,
            valueSuffix: '%'
        },
        data:[100, 222, 151, 86, 72, 51, 36],
    }, {
        name: 'Performance',
        type: 'column',
        zIndex: 2,
        data: [100, 222, 151, 86, 72, 51, 36]
    }]
 }
 */

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

    const [tmo, setTmo ] = useState([]);
    const [performance, setPerformance] = useState([])

    useEffect(() =>{
        async function loadData(){
           dispatch(Widget23Request())
            try{
                const response = await api.get(`/v1/widgets/stats/23?date=${currentDate}&parents%5B%5D=13`)
                const { data }  = response.data

                data.chart.series[0].data.map((item) =>{
                    tmo.push( item)
                })
                data.chart.series[1].data.map((item) =>{
                    performance.push( item)
                })

                dispatch(Widget23Sucess())
                setLoading(false)
            }catch(error){
                dispatch(Widget23Failure())
            }
        }
        loadData()
    },[])

    options.series[0].data = tmo;
    options.series[1].data = performance;
    return(
     <Container>
         <Error isError={isError}/>
         <InternalLoading isLoading={loading}/>
         <strong> TMO vs Performance</strong>
         <span>S-1</span>
         <HighchartsReact
            Highcharts={Highcharts}
            options={options}
            containerProps={{ className: 'widget23'}}
         />
     </Container>
    )
}
